// OpenAI Image Generation API (https://platform.openai.com/docs/api-reference/images).
// Server-side only: the key never reaches the browser.

export const IMAGE_SIZES = ['1024x1024', '1536x1024', '1024x1536', 'auto'] as const;
export const IMAGE_QUALITIES = ['low', 'medium', 'high', 'auto'] as const;
export const IMAGE_FORMATS = ['png', 'jpeg', 'webp'] as const;

export type ImageSize = (typeof IMAGE_SIZES)[number];
export type ImageQuality = (typeof IMAGE_QUALITIES)[number];
export type ImageFormat = (typeof IMAGE_FORMATS)[number];

export type ImageRequest = {
  prompt: string;
  size: ImageSize;
  quality: ImageQuality;
  format: ImageFormat;
  n: number;
};

export const MAX_PROMPT_LENGTH = 4000;
export const MAX_IMAGES = 4;

const DEFAULT_MODEL = 'gpt-image-1';
const ENDPOINT = 'https://api.openai.com/v1/images/generations';

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T | null {
  if (value === undefined || value === null || value === '') return fallback;
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

// Checks the incoming JSON. Returns the cleaned request, or a plain message
// saying what is wrong.
export function parseImageRequest(body: unknown): { ok: true; request: ImageRequest } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') return { ok: false, message: 'Send a JSON body with a prompt.' };
  const b = body as Record<string, unknown>;

  const prompt = typeof b.prompt === 'string' ? b.prompt.trim() : '';
  if (!prompt) return { ok: false, message: 'A prompt is required.' };
  if (prompt.length > MAX_PROMPT_LENGTH) return { ok: false, message: `The prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.` };

  const size = oneOf(b.size, IMAGE_SIZES, '1024x1024');
  if (!size) return { ok: false, message: `size must be one of: ${IMAGE_SIZES.join(', ')}.` };
  const quality = oneOf(b.quality, IMAGE_QUALITIES, 'medium');
  if (!quality) return { ok: false, message: `quality must be one of: ${IMAGE_QUALITIES.join(', ')}.` };
  const format = oneOf(b.format, IMAGE_FORMATS, 'png');
  if (!format) return { ok: false, message: `format must be one of: ${IMAGE_FORMATS.join(', ')}.` };

  const n = b.n === undefined ? 1 : b.n;
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 1 || n > MAX_IMAGES) {
    return { ok: false, message: `n must be a whole number from 1 to ${MAX_IMAGES}.` };
  }

  return { ok: true, request: { prompt, size, quality, format, n } };
}

export type GeneratedImage = { b64: string; mimeType: string };
export type GenerateResult =
  | { ok: true; images: GeneratedImage[] }
  | { ok: false; reason: 'not-configured' | 'rejected' | 'failed'; message: string };

export async function generateImages(
  request: ImageRequest,
  env: Record<string, string | undefined> = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<GenerateResult> {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) return { ok: false, reason: 'not-configured', message: 'Image generation is not set up yet.' };

  let res: Response;
  try {
    res = await fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: env.OPENAI_IMAGE_MODEL || DEFAULT_MODEL,
        prompt: request.prompt,
        size: request.size,
        quality: request.quality,
        output_format: request.format,
        n: request.n,
      }),
      signal: AbortSignal.timeout(110_000),
    });
  } catch {
    return { ok: false, reason: 'failed', message: 'Could not reach OpenAI. Please try again.' };
  }

  const data = (await res.json().catch(() => null)) as {
    data?: { b64_json?: string }[];
    error?: { message?: string; code?: string };
  } | null;

  if (!res.ok) {
    // 400 usually means OpenAI's content policy or a bad setting: safe to show.
    // Anything else (bad key, billing, outage) is logged by the caller, not shown.
    const rejected = res.status === 400;
    return {
      ok: false,
      reason: rejected ? 'rejected' : 'failed',
      message: rejected ? data?.error?.message || 'OpenAI could not make that image.' : 'Image generation failed. Please try again.',
    };
  }

  const mimeType = `image/${request.format}`;
  const images = (data?.data ?? []).flatMap((d) => (d.b64_json ? [{ b64: d.b64_json, mimeType }] : []));
  if (!images.length) return { ok: false, reason: 'failed', message: 'OpenAI returned no image.' };
  return { ok: true, images };
}
