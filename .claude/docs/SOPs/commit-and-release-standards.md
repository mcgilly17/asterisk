# Commit and Release Standards (2025)

This document defines our commit message format, versioning strategy, and release automation practices.

---

## Table of Contents

1. [Conventional Commits](#conventional-commits)
2. [Commit Types](#commit-types)
3. [Atomic Commits](#atomic-commits)
4. [Commit Body Guidelines](#commit-body-guidelines)
5. [Git Trailers](#git-trailers)
6. [Breaking Changes](#breaking-changes)
7. [Pull Request Standards](#pull-request-standards)
8. [Merge Strategy](#merge-strategy)
9. [Version Management](#version-management)
10. [Quality Gates](#quality-gates)
11. [Common Scenarios](#common-scenarios)
12. [Tooling Configuration](#tooling-configuration)

---

## Conventional Commits

All commits **MUST** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>[(scope)]: <subject>

[body]

[trailers]
```

### Components

- **type**: Required - The type of change (see [Commit Types](#commit-types))
- **scope**: Optional but encouraged - The area of codebase affected (e.g., `auth`, `api`, `ui`, `docs`)
- **subject**: Required - Brief description in imperative mood (e.g., "add login feature" not "added")
- **body**: Optional - Detailed explanation of why and how
- **trailers**: Optional - Metadata like issue references, co-authors

### Examples

```bash
# Simple commit with scope
feat(auth): add social login support

# Simple commit without scope (also valid)
feat: add dark mode toggle

# Detailed commit with body
fix(api): resolve race condition in user profile updates

Why: Multiple simultaneous updates caused data corruption due to
missing transaction locks. This was discovered during load testing.

How: Wrapped profile update logic in database transaction with
SELECT FOR UPDATE to ensure atomic updates.

Refs: #234
```

---

## Commit Types

### Standard Types

| Type | Description | Version Bump | When to Use |
|------|-------------|--------------|-------------|
| `feat` | New feature | MINOR (1.X.0) | Adding new functionality |
| `fix` | Bug fix | PATCH (1.0.X) | Fixing bugs or issues |
| `docs` | Documentation | None | README, comments, docs |
| `style` | Code style/formatting | None | Whitespace, formatting, semicolons |
| `refactor` | Code refactoring | None | Restructuring without behavior change |
| `perf` | Performance improvement | PATCH (1.0.X) | Optimizations |
| `test` | Test additions/updates | None | Adding or updating tests |
| `chore` | Maintenance tasks | None | Dependencies, configs, tooling |
| `ci` | CI/CD changes | None | GitHub Actions, pipeline configs |
| `build` | Build system changes | None | Webpack, Vite, Next.js config |
| `revert` | Revert previous commit | Depends | Reverting changes |
| `dx` | Developer experience | None | Tooling improvements for developers |

### Type Selection Guidelines

- **feat**: Use when adding user-facing functionality
- **fix**: Use for correcting existing functionality
- **refactor**: Use when improving code without changing behavior
- **perf**: Use when improving performance (runtime, bundle size, etc.)
- **chore**: Use for dependency updates, config changes
- **ci**: Use for GitHub Actions, deployment configs
- **build**: Use for build tool configuration (Next.js, Turbopack, etc.)
- **dx**: Use for developer tooling improvements (linting rules, IDE configs)

---

## Atomic Commits

**MANDATORY: Make atomic commits - ONE logical change per commit**

### What is an Atomic Commit?

An atomic commit:
- Contains changes related to a **single purpose**
- Can be understood **independently** without context
- Can be **reverted** without affecting unrelated functionality
- Makes git history **clear and bisectable**
- Enables easier code review and debugging

### Examples

#### ✅ GOOD - Atomic Commits

```bash
git commit -m "feat(auth): add AuthProvider component"
git commit -m "refactor(providers): move providers to app/providers folder"
git commit -m "feat(toast): add Sonner toast provider"
git commit -m "docs(commits): add commit standards documentation"
git commit -m "chore(deps): add @tanstack/react-query"
```

#### ❌ BAD - Mega Commit

```bash
git commit -m "feat: add database, refactor providers, add toasts, update docs, install deps"
```

### Commit Frequency

**MANDATORY: Commit after EVERY logical change**

Commit after:
- ✅ Creating a new component or file
- ✅ Completing a refactor
- ✅ Adding a feature
- ✅ Fixing a specific bug
- ✅ Updating documentation
- ✅ Installing/updating dependencies
- ✅ Configuring a tool or service

---

## Commit Body Guidelines

### When to Include a Body

Include a detailed body when:
- The change is non-trivial
- Context or rationale isn't obvious from the subject
- Implementation involved important decisions or tradeoffs
- Future developers need to understand why, not just what

### Body Format

Use this simplified format:

```
<type>(<scope>): <subject>

Why: <reason for change, context, business justification>

[Optional] How: <implementation details for complex changes>

[Optional trailers]
```

### Examples

#### Simple Change (No Body Needed)

```bash
git commit -m "docs(readme): fix typo in installation section"
```

#### Complex Change (Body Included)

```bash
git commit -m "perf(api): implement Redis caching for user profiles

Why: API response times exceeded 2s during peak traffic, causing
user frustration. Profiling showed 80% of time spent on database
queries for frequently accessed profile data.

How: Implemented Redis cache with 5-minute TTL. Cache is invalidated
on profile updates. Reduced P95 latency from 2.1s to 180ms.

Refs: #456"
```

#### Refactoring with Context

```bash
git commit -m "refactor(auth): extract validation logic to separate module

Why: Validation logic was duplicated across 3 different auth routes,
making updates error-prone. Consolidating improves maintainability
and test coverage.

Co-authored-by: Jane Doe <jane@example.com>"
```

### Body Best Practices

- Focus on **why**, not what (what is in the subject line)
- Wrap lines at 72-100 characters for readability
- Use bullet points for multiple points
- Reference issues, PRs, or documentation
- Include migration notes for breaking changes

---

## Git Trailers

Git trailers are key-value pairs in the commit footer that provide metadata.

### Common Trailers

#### `Refs:` - Issue Tracking References

Link commits to issues in Linear, GitHub, Jira, etc.

```bash
feat(api): add rate limiting

Implements token bucket algorithm for API endpoints.

Refs: #123
Refs: PROJ-456
Refs: https://linear.app/company/issue/BLOC-789
```

**Format:**
- GitHub: `Refs: #123` or `Refs: owner/repo#123`
- Linear: `Refs: PROJ-123`
- Multiple: Use multiple `Refs:` lines
- **Optional**: Only include when relevant issue exists

#### `Co-authored-by:` - Pair Programming Attribution

Credit contributors in pair programming or collaborative work.

```bash
feat(auth): implement OAuth flow

Co-authored-by: Jane Doe <jane@example.com>
Co-authored-by: Bob Smith <bob@example.com>
```

**Format:**
- `Co-authored-by: Full Name <email@example.com>`
- Multiple authors: Use multiple `Co-authored-by:` lines
- Appears in GitHub as co-author

#### `Signed-off-by:` - Developer Certificate of Origin

Certify that you have rights to submit the code (used in some open-source projects).

```bash
feat(core): add plugin system

Signed-off-by: John Developer <john@example.com>
```

**When to use:**
- Required by some open-source projects (Linux kernel, etc.)
- Corporate projects with DCO requirements
- Not needed for most private projects

#### `Reviewed-by:` - Code Review Attribution

Document who reviewed the code (usually automatic from PRs).

```bash
fix(api): resolve memory leak

Reviewed-by: Senior Dev <senior@example.com>
```

**Usage:**
- Typically added automatically by tools
- Can be added manually for audit trails

---

## Breaking Changes

Breaking changes are changes that require users to modify their code or configuration.

### Two Valid Formats

#### Format 1: Footer (Recommended for Complex Changes)

```bash
feat(api): redesign authentication endpoints

Migrated from JWT in cookies to Bearer token in Authorization header
for improved security and compatibility with mobile clients.

BREAKING CHANGE: All API endpoints now require Authorization header
with Bearer token. Cookie-based authentication is no longer supported.

Migration guide: https://docs.example.com/v2-migration

Refs: #567
```

#### Format 2: Exclamation Mark (Shorthand)

```bash
feat(api)!: redesign authentication endpoints
```

**Or with scope:**

```bash
feat(auth)!: remove legacy password reset flow
```

### When to Use Each Format

- **Footer format**: Use for complex breaking changes requiring explanation
- **Exclamation mark**: Use for simple, self-explanatory breaking changes
- **Both together**: Valid to use `!` in subject AND footer for emphasis

### Breaking Change Guidelines

- **Be conservative**: Not every API change is breaking
- **Provide migration path**: Always explain how to upgrade
- **Batch breaking changes**: Accumulate multiple breaking changes for major releases
- **Deprecate first**: When possible, deprecate before removing (MINOR → MAJOR)

### Version Impact

```bash
# Regular feature
feat(api): add user profile endpoint  # → 1.1.0

# Breaking change
feat(api)!: remove v1 endpoints       # → 2.0.0 (requires approval)
```

**Important**: MAJOR version bumps (x.0.0) require manual approval. Breaking changes accumulate until a deliberate MAJOR release is triggered.

---

## Pull Request Standards

### PR Title Format

PR titles **MUST** follow conventional commit format (becomes the squash commit message).

**Format:**
```
<type>(<scope>): <description>
```

**Examples:**
```
feat(auth): add social login support
fix(profile): resolve trust score calculation
docs(readme): update installation instructions
```

**Optional**: Include issue reference in PR description or title:
```
feat(auth): add social login support (#42)
feat(auth): add social login (BLOC-42)
```

### PR Description Template

```markdown
## What

Brief description of the change.

## Why

Business justification or problem being solved.

## How

High-level implementation approach.

## Testing

How this was tested (manual, automated, etc.)

## Refs

- Refs: #123
- Refs: BLOC-456
```

---

## Merge Strategy

### Default: Squash and Merge

**Use squash and merge for:**
- ✅ All feature branches
- ✅ All bug fix branches
- ✅ All documentation updates
- ✅ All chore/refactor work

**Why squash:**
- Creates clean, linear git history
- One commit per PR makes history scannable
- PR title becomes the commit message
- Encourages atomic PRs

### Exception: Merge Commit for Hotfixes

**Use merge commit for:**
- 🚨 Hotfix branches going to production
- Preserves exact commit that was deployed
- Maintains emergency fix context

**How to identify hotfix:**
- Branch name: `hotfix/*`
- Deployed directly to production
- Requires immediate rollout

### Never Use: Rebase and Merge to Main

- ❌ Do not use rebase and merge to main branch
- Can create confusion with commit history
- Squash or merge commit only

---

## Version Management

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/) (SemVer): `MAJOR.MINOR.PATCH`

```
1.2.3
│ │ │
│ │ └─ PATCH: Bug fixes, small improvements
│ └─── MINOR: New features, backwards compatible
└───── MAJOR: Breaking changes, major milestones
```

### Version Bump Rules

| Commit Type | Version Change | Example |
|-------------|----------------|---------|
| `fix`, `perf` | PATCH | 1.0.0 → 1.0.1 |
| `feat` | MINOR | 1.0.0 → 1.1.0 |
| `BREAKING CHANGE` | MAJOR* | 1.0.0 → 2.0.0 |
| `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`, `dx` | None | No release |

**\*MAJOR releases require manual approval** - see below

### Multiple Commit Types in One PR

When a PR contains multiple commits with different types:

**Rule: Highest semantic version wins**

```
feat + fix + docs = MINOR (1.1.0)
fix + docs = PATCH (1.0.1)
BREAKING CHANGE + feat = MAJOR (2.0.0)
```

Precedence: `MAJOR > MINOR > PATCH > No bump`

**Note**: semantic-release automatically analyzes all commits and picks the highest version.

### MAJOR Version Philosophy

**MAJOR versions are deliberate milestones, not automatic bumps.**

#### Policy

- `BREAKING CHANGE` commits are allowed in the codebase
- Breaking changes **accumulate** until a MAJOR release is ready
- MAJOR releases require **manual approval** from team lead
- MAJOR versions signify major milestones or product evolution

#### Rationale

- Avoids version number inflation (v47.0.0 feels arbitrary)
- Allows batching multiple breaking changes into one release
- MAJOR versions become marketing/communication events
- Users upgrade deliberately, not constantly

#### Workflow

1. Developer commits with `BREAKING CHANGE` as needed
2. Changes are released as MINOR with deprecation warnings (if possible)
3. When ready for MAJOR release, team lead triggers manual release
4. All accumulated breaking changes roll up into MAJOR version

---

## Quality Gates

All code must pass quality checks at two stages: **pre-commit** and **PR merge**.

### Pre-Commit Hooks (via Husky)

Runs automatically before `git commit`:

- ✅ **Biome check**: Linting and formatting
- ✅ **Commitlint**: Validates conventional commit format
- ✅ **TypeScript**: Type checking

**If any check fails, commit is blocked.**

### PR Merge Requirements

All PRs must meet these criteria before merging:

- ✅ **CI/CD pipeline passes**: All checks must be green
  - Biome linting
  - TypeScript compilation
  - Tests (when available)
  - Build succeeds

**Future requirements** (enable when ready):
- Minimum 1 approval
- Branch up-to-date with base
- PR title follows conventional commits (validated by GitHub Action)

---

## Common Scenarios

### Scenario 1: Installing Dependencies

```bash
# Install dependency
npm install @tanstack/react-query

# Commit (separate from feature work)
git add package.json package-lock.json
git commit -m "chore(deps): add @tanstack/react-query"
```

### Scenario 2: Simple Feature

```bash
# Make changes
git add src/components/LoginButton.tsx

# Commit
git commit -m "feat(auth): add login button component"
```

### Scenario 3: Bug Fix with Context

```bash
git commit -m "fix(api): prevent duplicate user registration

Why: Race condition allowed same email to register twice when requests
sent simultaneously. Discovered in production during load test.

How: Added unique constraint on email column and wrapped registration
in database transaction.

Refs: #789"
```

### Scenario 4: Breaking Change

```bash
git commit -m "feat(api)!: migrate to v2 authentication

BREAKING CHANGE: All API endpoints now require Authorization header
with Bearer token. Query parameter authentication removed.

Migration: Replace ?token=xxx with header 'Authorization: Bearer xxx'
See: https://docs.example.com/v2-migration

Refs: #234"
```

### Scenario 5: Reverting a Commit

```bash
# Revert the commit
git revert abc123def

# Edit commit message to:
git commit --amend -m "revert(auth): revert 'feat(auth): add social login'

Reverting due to security vulnerability in OAuth implementation.
Will re-implement with proper PKCE flow in next PR.

Refs: #456"
```

### Scenario 6: Pair Programming

```bash
git commit -m "feat(profile): add user bio editing

Implemented rich text editor with markdown support.

Co-authored-by: Jane Doe <jane@example.com>"
```

### Scenario 7: Documentation Update

```bash
git commit -m "docs(api): add rate limiting documentation

Added examples and error codes for rate limit responses."
```

### Scenario 8: Refactoring

```bash
git commit -m "refactor(utils): extract date formatting to utility

Why: Date formatting logic was duplicated in 5 components.
Consolidating reduces duplication and ensures consistency.

How: Created formatDate utility with multiple format options."
```

---

## Tooling Configuration

### commitlint.config.js

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
        'dx',
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-full-stop': [2, 'never', '.'],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  ],
}
```

### package.json Configuration

```json
{
  "scripts": {
    "commit": "git-cz",
    "lint": "biome check",
    "format": "biome format --write",
    "type-check": "tsc --noEmit"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json}": [
      "biome check --write --no-errors-on-unmatched"
    ]
  }
}
```

### .releaserc.json (semantic-release)

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

### Husky Hooks

**.husky/commit-msg:**
```bash
#!/usr/bin/env sh
npx --no -- commitlint --edit $1
```

**.husky/pre-commit:**
```bash
#!/usr/bin/env sh
# Run lint-staged (Biome)
npx lint-staged

# Type check
npm run type-check
```

---

## Enforcement

### Automated Enforcement

- ✅ Pre-commit hooks validate commit messages (commitlint)
- ✅ Pre-commit hooks run linting and type checking
- ✅ GitHub Actions validate PR titles
- ✅ CI/CD pipeline blocks failing builds

### Manual Review

- 👀 Code reviewers check for:
  - Atomic commits (one logical change per commit)
  - Appropriate commit types
  - Meaningful commit messages
  - Breaking changes properly documented

---

## Additional Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Atomic Commits](https://www.freshconsulting.com/insights/blog/atomic-commits/)

---

## Quick Reference

### Commit Format Cheat Sheet

```bash
# Feature
feat(scope): add new feature

# Bug fix
fix(scope): resolve issue

# Documentation
docs(scope): update documentation

# Refactoring
refactor(scope): restructure code

# Performance
perf(scope): improve performance

# Tests
test(scope): add tests

# Chores
chore(deps): update dependencies
chore(config): update config

# CI/CD
ci: update GitHub Actions

# Build
build: update Next.js config

# Developer Experience
dx: improve development tooling

# Breaking change
feat(api)!: remove deprecated endpoints

BREAKING CHANGE: Detailed explanation here
```

### Pre-Commit Checklist

Before committing, ensure:
- [ ] Commit message follows conventional format
- [ ] One logical change per commit (atomic)
- [ ] Code is linted and formatted (automatic)
- [ ] TypeScript compiles (automatic)
- [ ] Complex changes include "Why" explanation
- [ ] Breaking changes documented with `BREAKING CHANGE`
- [ ] Issue reference added (if applicable)

---

**Last Updated**: 2025-01-17
**Version**: 1.0.0
