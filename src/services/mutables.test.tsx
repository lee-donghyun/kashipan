import {describe, expect, test} from '@jest/globals';

import {mainScreenMutable} from './mutables';

describe('mainScreenMutable 테스트', () => {
  test('depth 초기화', () => {
    expect(mainScreenMutable.getDepth()).toBe(0);
  });
  test('depth 추가', () => {
    mainScreenMutable.addDepth();
    expect(mainScreenMutable.getDepth()).toBe(1);
  });
  test('depth 제거', () => {
    mainScreenMutable.removeDepth();
    expect(mainScreenMutable.getDepth()).toBe(0);
  });
});
