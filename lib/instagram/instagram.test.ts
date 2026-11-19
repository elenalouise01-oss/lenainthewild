import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { apiFromEnv, commentsFromPayload, matchKeyword, validSignature } from './instagram';

// Run with: npm test

describe('matchKeyword', () => {
  it('matches any capitalisation, with emoji and punctuation', () => {
    assert.equal(matchKeyword('LEAP')?.keyword, 'LEAP');
    assert.equal(matchKeyword('leap 💜')?.keyword, 'LEAP');
    assert.equal(matchKeyword('Unstuck!!')?.keyword, 'UNSTUCK');
    assert.equal(matchKeyword('yes please, unstuck')?.keyword, 'UNSTUCK');
  });
  it('ignores other comments and part-words', () => {
    assert.equal(matchKeyword('love this'), null);
    assert.equal(matchKeyword('leaping with joy'), null);
    assert.equal(matchKeyword(''), null);
  });
});

describe('validSignature', () => {
  const body = '{"object":"instagram"}';
  const good = 'sha256=' + createHmac('sha256', 's3cret').update(body).digest('hex');
  it('accepts the right signature', () => assert.equal(validSignature(body, good, 's3cret'), true));
  it('rejects a wrong, missing or malformed one', () => {
    assert.equal(validSignature(body, good, 'other'), false);
    assert.equal(validSignature(body, null, 's3cret'), false);
    assert.equal(validSignature(body, 'sha256=abc', 's3cret'), false);
  });
});

describe('commentsFromPayload', () => {
  it('reads comment events and skips everything else', () => {
    const payload = {
      object: 'instagram',
      entry: [
        {
          id: 'IG1',
          changes: [
            { field: 'comments', value: { id: 'C1', text: 'LEAP', from: { id: 'U1' } } },
            { field: 'mentions', value: { id: 'M1' } },
            { field: 'comments', value: { id: 'C2', from: { id: 'U2' } } },
          ],
        },
      ],
    };
    assert.deepEqual(commentsFromPayload(payload), [{ source: 'instagram', ownerId: 'IG1', commentId: 'C1', fromId: 'U1', text: 'LEAP' }]);
    assert.deepEqual(commentsFromPayload(null), []);
  });
});

describe('Facebook Page comments', () => {
  const feed = (value: object) => ({ object: 'page', entry: [{ id: 'PAGE1', changes: [{ field: 'feed', value }] }] });
  const base = { item: 'comment', verb: 'add', comment_id: 'FC1', post_id: 'PAGE1_POST', parent_id: 'PAGE1_POST', from: { id: 'U9' }, message: 'unstuck' };
  it('reads a top-level comment (its parent is the post)', () => {
    assert.deepEqual(commentsFromPayload(feed(base)), [{ source: 'facebook', ownerId: 'PAGE1', commentId: 'FC1', fromId: 'U9', text: 'unstuck' }]);
  });
  it('skips replies to other comments, edits and likes', () => {
    assert.deepEqual(commentsFromPayload(feed({ ...base, parent_id: 'SOME_OTHER_COMMENT' })), []);
    assert.deepEqual(commentsFromPayload(feed({ ...base, verb: 'edited' })), []);
    assert.deepEqual(commentsFromPayload(feed({ ...base, item: 'like' })), []);
  });
});

describe('apiFromEnv', () => {
  it('prefers the Page token, falls back to the Instagram token, else null', () => {
    assert.equal(apiFromEnv({ META_PAGE_ACCESS_TOKEN: 'p', INSTAGRAM_ACCESS_TOKEN: 'i' })?.mode, 'page');
    assert.equal(apiFromEnv({ INSTAGRAM_ACCESS_TOKEN: 'i' })?.mode, 'instagram');
    assert.equal(apiFromEnv({}), null);
  });
});
