import {JUNHO_API_URL} from '@env';
import {describe, expect, test} from '@jest/globals';

describe('@env 테스트', () => {
  test('api base 테스트', () => {
    expect(JUNHO_API_URL).toBe('http://43.201.97.1:8080');
  });
});
