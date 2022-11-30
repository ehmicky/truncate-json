// List of strings with different behavior when being serialized to JSON
export const STRINGS = [
  'test',
  '',
  // Backslash sequences
  '\n',
  '\0',
  // UTF-8 character
  '𝌆',
  // Valid UTF-8 sequences
  '\uD834\uDF06',
  // Invalid UTF-8 sequences
  '\uDF06\uD834',
  '\uDEAD',
]
