import {JUNHO_API_URL, KAKAO_API_URL} from '@env';
import {describe, expect, test} from '@jest/globals';

describe('@env 테스트', () => {
  test('api base 테스트', () => {
    expect(JUNHO_API_URL).toBeDefined();
    expect(KAKAO_API_URL).toBeDefined();
  });
});
