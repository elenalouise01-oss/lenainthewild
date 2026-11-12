import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { commentsFromPayload, matchKeyword, validSignature } from './instagram';

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
    assert.deepEqual(commentsFromPayload(payload), [{ igId: 'IG1', commentId: 'C1', fromId: 'U1', text: 'LEAP' }]);
    assert.deepEqual(commentsFromPayload(null), []);
  });
});
