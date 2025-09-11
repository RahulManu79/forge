import { pascalCase, kebabCase } from '../casing';

describe('casing utilities', () => {
  test('pascalCase', () => {
    expect(pascalCase('user')).toBe('User');
    expect(pascalCase('user_profile')).toBe('UserProfile');
    expect(pascalCase('user-profile')).toBe('UserProfile');
  });

  test('kebabCase', () => {
    expect(kebabCase('UserProfile')).toBe('user-profile');
    expect(kebabCase('user profile')).toBe('user-profile');
  });
});
