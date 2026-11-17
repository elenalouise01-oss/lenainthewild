import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateImages, parseImageRequest } from './images';

// Run with: npm test

describe('parseImageRequest', () => {
  it('fills in defaults', () => {
    const r = parseImageRequest({ prompt: '  a monkey on a beach ' });
    assert.ok(r.ok);
    if (r.ok) assert.deepEqual(r.request, { prompt: 'a monkey on a beach', size: '1024x1024', quality: 'medium', format: 'png', n: 1 });
  });
  it('rejects a missing, empty or too long prompt', () => {
    assert.equal(parseImageRequest(null).ok, false);
    assert.equal(parseImageRequest({ prompt: '   ' }).ok, false);
    assert.equal(parseImageRequest({ prompt: 'x'.repeat(4001) }).ok, false);
  });
  it('rejects unknown settings and bad counts', () => {
    assert.equal(parseImageRequest({ prompt: 'a', size: '99x99' }).ok, false);
    assert.equal(parseImageRequest({ prompt: 'a', quality: 'ultra' }).ok, false);
    assert.equal(parseImageRequest({ prompt: 'a', format: 'gif' }).ok, false);
    assert.equal(parseImageRequest({ prompt: 'a', n: 0 }).ok, false);
    assert.equal(parseImageRequest({ prompt: 'a', n: 5 }).ok, false);
    assert.equal(parseImageRequest({ prompt: 'a', n: 1.5 }).ok, false);
  });
});

describe('generateImages', () => {
  const request = { prompt: 'a', size: '1024x1024', quality: 'low', format: 'webp', n: 2 } as const;
  const reply = (status: number, body: unknown) => (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;

  it('is not configured without a key', async () => {
    const r = await generateImages(request, {}, reply(200, {}));
    assert.ok(!r.ok && r.reason === 'not-configured');
  });
  it('sends the request and returns the images', async () => {
    let sent: { url: string; init: RequestInit } | undefined;
    const fake = (async (url: string, init: RequestInit) => {
      sent = { url, init };
      return new Response(JSON.stringify({ data: [{ b64_json: 'AAA' }, { b64_json: 'BBB' }] }), { status: 200 });
    }) as unknown as typeof fetch;
    const r = await generateImages(request, { OPENAI_API_KEY: 'sk-test' }, fake);
    assert.ok(r.ok);
    if (r.ok) assert.deepEqual(r.images, [{ b64: 'AAA', mimeType: 'image/webp' }, { b64: 'BBB', mimeType: 'image/webp' }]);
    assert.equal(sent?.url, 'https://api.openai.com/v1/images/generations');
    assert.equal((sent?.init.headers as Record<string, string>).Authorization, 'Bearer sk-test');
    const body = JSON.parse(String(sent?.init.body));
    assert.equal(body.model, 'gpt-image-1');
    assert.equal(body.output_format, 'webp');
    assert.equal(body.n, 2);
  });
  it('shows policy rejections but hides other OpenAI errors', async () => {
    const env = { OPENAI_API_KEY: 'sk-test' };
    const policy = await generateImages(request, env, reply(400, { error: { message: 'Blocked by policy' } }));
    assert.ok(!policy.ok && policy.reason === 'rejected' && policy.message === 'Blocked by policy');
    const auth = await generateImages(request, env, reply(401, { error: { message: 'Incorrect API key sk-test' } }));
    assert.ok(!auth.ok && auth.reason === 'failed' && !auth.message.includes('sk-test'));
  });
  it('fails when no image comes back', async () => {
    const r = await generateImages(request, { OPENAI_API_KEY: 'k' }, reply(200, { data: [] }));
    assert.ok(!r.ok && r.reason === 'failed');
  });
});
