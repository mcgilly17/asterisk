module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Custom type enum including all our types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature (MINOR)
        'fix', // Bug fix (PATCH)
        'docs', // Documentation
        'style', // Code style/formatting
        'refactor', // Code refactoring
        'perf', // Performance improvement (PATCH)
        'test', // Tests
        'chore', // Maintenance
        'ci', // CI/CD changes
        'build', // Build system changes
        'revert', // Revert commit
        'dx', // Developer experience
      ],
    ],
    // Scope format
    'scope-case': [2, 'always', 'kebab-case'],
    // Subject format
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-empty': [2, 'never'],
    // Body format
    'body-max-line-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    // Footer format
    'footer-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
  },
}
