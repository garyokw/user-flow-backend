// controllers/__tests__/auth.spec.js
const { createToken, verifyToken } = require('../auth');

describe('Auth Controller', () => {
  let user;
  let token;

  beforeEach(() => {
    user = { id: 1, username: 'test' };
    token = createToken(user);
  });

  test('createToken should return a token', () => {
    expect(typeof token).toBe('string');
  });

  test('verifyToken should return the user if the token is valid', () => {
    const verifiedUser = verifyToken(token);
    expect(verifiedUser.id).toBe(user.id);
    expect(verifiedUser.username).toBe(user.username);
  });

  test('verifyToken should throw an error if the token is invalid', () => {
    expect(() => verifyToken('invalid_token')).toThrow();
  });
});
