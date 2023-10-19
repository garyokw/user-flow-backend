// controllers/__tests__/auth.test.js
const { createToken, verifyToken } = require('../auth');

test('create and verify token', () => {
  const user = { id: 1, username: 'test' };
  const token = createToken(user);
  const verifiedUser = verifyToken(token);
  expect(verifiedUser.id).toBe(user.id);
  expect(verifiedUser.username).toBe(user.username);
});

test('verify invalid token', () => {
  const token = 'invalid_token';
  expect(() => verifyToken(token)).toThrow();
});
