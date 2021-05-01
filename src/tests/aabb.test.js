import getCollisionBox from '../logic/aabb';

describe('getCollisionBox()', () => {
  test('should throw error if given invalid parameters', () => {
    expect(() => getCollisionBox()).toThrowError();
    expect(() => getCollisionBox(1)).toThrowError();
    expect(() => getCollisionBox(1, 3)).toThrowError();
    expect(() => getCollisionBox({x: 4, y: 4, width: 20, height: 20 })).toThrowError();
    expect(() => getCollisionBox({x: 4, y: 4}, {x: 5, y: 5})).toThrowError();
  });
  
  test('should return true if box positions overlap', () => {
    const boxA = {x: 1, y: 1, width: 2, height: 3};
    const boxB = {x: 2, y: 3, width: 3, height: 3};
    expect(getCollisionBox(boxA,boxB)).toEqual(true);
  });

  test('should return true if box positions are the same', () => {
    const boxA = {x: 1, y: 1, width: 2, height: 3};
    const boxB = {x: 1, y: 1, width: 2, height: 3};
    expect(getCollisionBox(boxA,boxB)).toEqual(true);
  })

  test('should return false if box positions do not overlap', () => {
    const boxA = {x: 1, y: 1, width: 2, height: 3};
    const boxB = {x: 4, y: 3, width: 3, height: 3};
    expect(getCollisionBox(boxA,boxB)).toEqual(false);
  })

  test('should return false if box positions are adjacent', () => {
    const boxA = {x: 1, y: 1, width: 2, height: 3};
    const boxB = {x: 3, y: 3, width: 3, height: 3};
    expect(getCollisionBox(boxA,boxB)).toEqual(false);
  })
  
})
