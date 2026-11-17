# OpenAI image generation API

A private endpoint, `POST /api/images`, that makes images with the OpenAI Image
Generation API. It is not linked from the site and shows nothing to visitors.
Code: `app/api/images/route.ts` and `lib/openai/images.ts`. Tests: `npm test`.

## Setup (Vercel > Settings > Environment Variables)

| Name | What it is |
| --- | --- |
| `OPENAI_API_KEY` | Secret key from platform.openai.com (needs billing on and, for gpt-image models, organisation verification). |
| `IMAGE_API_SECRET` | Any long random password you choose. Callers must send it. |
| `OPENAI_IMAGE_MODEL` | Optional. Defaults to `gpt-image-1`. |

Without the first two, the endpoint answers 503 and does nothing. Redeploy
after adding them.

## Use

```bash
curl -X POST https://www.lenainthewild.com/api/images \
  -H "Authorization: Bearer $IMAGE_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a friendly monkey on a sunlit beach, soft watercolour","size":"1024x1024","quality":"medium"}'
```

Body fields: `prompt` (required, up to 4000 characters), `size`
(`1024x1024`, `1536x1024`, `1024x1536`, `auto`), `quality` (`low`, `medium`,
`high`, `auto`), `format` (`png`, `jpeg`, `webp`), `n` (1 to 4).

Reply: `{ "ok": true, "images": [{ "mimeType": "image/png", "b64": "..." }] }`.
Turn `b64` into a file, or use `data:image/png;base64,<b64>` as an image source.

## Safeguards

- Every call costs money, so the secret is required and checked in constant time.
- 10 requests per 10 minutes per caller (best effort, in memory).
- OpenAI errors other than content-policy rejections are logged in Vercel and
  never shown to the caller, so the key can't leak.
- Nothing is stored; images are returned and discarded.
