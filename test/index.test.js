const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

// Test Suite for capitalizeWords function
describe('capitalizeWords', () => {
  // Normal cases
  test('should capitalize first letter of each word - "hello world"', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('should capitalize multiple words correctly', () => {
    expect(capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  // Edge cases
  test('should handle empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('should handle strings with special characters like hyphens', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
  });

  test('should handle single-word strings', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  test('should handle already capitalized strings', () => {
    expect(capitalizeWords('Hello World')).toBe('Hello World');
  });

  test('should handle strings with extra spaces', () => {
    expect(capitalizeWords('hello  world')).toBe('Hello  World');
  });

  test('should handle strings with numbers', () => {
    expect(capitalizeWords('hello 123 world')).toBe('Hello 123 World');
  });

  test('should handle strings with punctuation', () => {
    expect(capitalizeWords('hello, world!')).toBe('Hello, World!');
  });
});

// Test Suite for filterActiveUsers function
describe('filterActiveUsers', () => {
  // Test with mixed active/inactive users
  test('should correctly filter active users from mixed array', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Charlie', isActive: true }
    ];
    const result = filterActiveUsers(users);
    expect(result).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Charlie', isActive: true }
    ]);
    expect(result.length).toBe(2);
  });

  test('should return all users when all are active', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: true }
    ];
    const result = filterActiveUsers(users);
    expect(result).toEqual(users);
  });

  // Test with all inactive users
  test('should return empty array when all users are inactive', () => {
    const users = [
      { name: 'Alice', isActive: false },
      { name: 'Bob', isActive: false }
    ];
    const result = filterActiveUsers(users);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  // Test with empty array
  test('should return empty array when input array is empty', () => {
    const result = filterActiveUsers([]);
    expect(result).toEqual([]);
  });

  test('should handle single active user', () => {
    const users = [{ name: 'Alice', isActive: true }];
    const result = filterActiveUsers(users);
    expect(result).toEqual([{ name: 'Alice', isActive: true }]);
  });

  test('should handle single inactive user', () => {
    const users = [{ name: 'Bob', isActive: false }];
    const result = filterActiveUsers(users);
    expect(result).toEqual([]);
  });
});

// Test Suite for logAction function
describe('logAction', () => {
  // Mock Date before each test
  beforeEach(() => {
    jest.spyOn(global.Date.prototype, 'toISOString').mockReturnValue('2024-11-27T12:00:00.000Z');
  });

  // Restore Date after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test with valid inputs
  test('should generate correct log string for valid inputs', () => {
    const result = logAction('login', 'Alice');
    expect(result).toBe('User Alice performed login at 2024-11-27T12:00:00.000Z');
  });

  test('should handle different action types', () => {
    expect(logAction('logout', 'Bob')).toBe('User Bob performed logout at 2024-11-27T12:00:00.000Z');
    expect(logAction('signup', 'Charlie')).toBe('User Charlie performed signup at 2024-11-27T12:00:00.000Z');
  });

  // Test edge cases - missing action
  test('should handle missing action (empty string)', () => {
    const result = logAction('', 'Alice');
    expect(result).toBe('User Alice performed  at 2024-11-27T12:00:00.000Z');
  });

  // Test edge cases - missing username
  test('should handle missing username (empty string)', () => {
    const result = logAction('login', '');
    expect(result).toBe('User  performed login at 2024-11-27T12:00:00.000Z');
  });

  // Test edge cases - both empty
  test('should handle both action and username as empty strings', () => {
    const result = logAction('', '');
    expect(result).toBe('User  performed  at 2024-11-27T12:00:00.000Z');
  });

  test('should handle action with spaces', () => {
    const result = logAction('sign up', 'Alice');
    expect(result).toBe('User Alice performed sign up at 2024-11-27T12:00:00.000Z');
  });

  test('should handle username with spaces', () => {
    const result = logAction('login', 'Alice Smith');
    expect(result).toBe('User Alice Smith performed login at 2024-11-27T12:00:00.000Z');
  });

  test('should always include timestamp in correct format', () => {
    const result = logAction('login', 'Alice');
    expect(result).toContain('at 2024-11-27T12:00:00.000Z');
    expect(result).toMatch(/at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
  });
});