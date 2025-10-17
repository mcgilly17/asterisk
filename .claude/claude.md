# Asterisk Website Project

Official website for Asterisk - a design and build MVP products company.

## 🚨 IMPORTANT: Before Making Any Commits

**READ THIS FIRST:** `.claude/docs/SOPs/commit-and-release-standards.md`

All commits MUST follow the documented standards. The pre-commit hooks will enforce this, but understanding the "why" and best practices is essential. **Do not make commits without reading the SOP document first.**

## Project Stack (2025)

### Core Framework
- **Next.js 15** - App Router with React Server Components
- **React 19** - Latest stable release
- **TypeScript 5** - Strict mode enabled
- **Turbopack** - Default bundler (replaces Webpack)

### Styling & UI
- **Tailwind CSS v4** - Latest major version (Jan 2025 release)
- **CSS-first configuration** - Native CSS features
- **Automatic content detection** - Zero config needed

### Code Quality
- **Biome 2.2.0** - Unified linting and formatting (replaces ESLint + Prettier)
- **35x faster** than ESLint
- **One tool** for linting, formatting, and import sorting

### Git & Versioning
- **Husky** - Git hooks management
- **Commitlint** - Enforces conventional commits
- **semantic-release** - Automated versioning and releases
- **Conventional Commits** - Standard commit format

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting and formatting
npm run lint        # Check for issues
npm run format      # Auto-fix formatting
npm run check       # Lint + format + organize imports

# Type checking
npm run type-check  # TypeScript compilation check
```

## Project Structure

```
asterisk-website/
├── .claude/
│   ├── claude.md                          # This file
│   └── docs/
│       └── SOPs/
│           └── commit-and-release-standards.md  # 🚨 READ THIS FIRST
├── .github/
│   └── workflows/
│       ├── ci.yml                         # CI/CD pipeline
│       └── release.yml                    # Automated releases
├── .husky/
│   ├── commit-msg                         # Commitlint hook
│   └── pre-commit                         # Biome + TypeScript check
├── src/
│   ├── app/                               # Next.js App Router
│   ├── components/                        # React components
│   ├── lib/                               # Utilities
│   └── styles/                            # Global styles
├── public/                                # Static assets
├── biome.json                             # Biome configuration
├── commitlint.config.js                   # Commit validation rules
├── .releaserc.json                        # semantic-release config
├── next.config.ts                         # Next.js configuration
├── tailwind.config.ts                     # Tailwind configuration
├── tsconfig.json                          # TypeScript configuration
└── package.json                           # Dependencies and scripts
```

## Architecture Principles

### Next.js 15 App Router
- **Server Components by default** - Zero JavaScript to client unless needed
- **Client Components** - Mark with `'use client'` directive only when necessary
- **Streaming with Suspense** - Progressive rendering for better UX
- **File-based routing** - Automatic route generation from file structure

### TypeScript Standards
- **Strict mode enabled** - Catch bugs at compile time
- **No `any` types** - Use proper types or `unknown` with guards
- **Type imports** - Use `import type` for type-only imports (enforced by Biome)
- **Exhaustive dependencies** - React hooks must declare all dependencies

### React Best Practices
- **Server Components first** - Only use Client Components when needed (interactivity, hooks, browser APIs)
- **Composition over inheritance** - Prefer component composition
- **Props destructuring** - Clear component APIs
- **Accessibility** - WCAG 2.2 AA compliance minimum

## Code Quality Standards

### Biome Configuration
- **Line width**: 100 characters
- **Quotes**: Single quotes for JS/TS, double quotes for JSX
- **Semicolons**: As needed (ASI-aware)
- **Import organization**: Automatic sorting enabled
- **Accessibility rules**: Enforced for JSX/TSX files

### Pre-commit Checks (Automatic)
Every commit runs these checks:
1. **Biome check** - Linting and formatting
2. **Commitlint** - Validates conventional commit format
3. **TypeScript** - Type checking

**If any check fails, the commit is blocked.**

## Commit Standards

### Format (Conventional Commits)
```
<type>[(scope)]: <subject>

[body]

[trailers]
```

### Common Types
- `feat` - New feature (MINOR version bump)
- `fix` - Bug fix (PATCH version bump)
- `docs` - Documentation changes
- `refactor` - Code restructuring without behavior change
- `perf` - Performance improvements
- `chore` - Maintenance (deps, configs)
- `ci` - CI/CD changes
- `build` - Build system changes

### Quick Examples
```bash
# Simple feature
git commit -m "feat(auth): add social login support"

# Bug fix with scope
git commit -m "fix(api): resolve race condition in user updates"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Dependency update
git commit -m "chore(deps): upgrade next to 15.5.6"
```

### 🚨 For Detailed Guidelines
**See:** `.claude/docs/SOPs/commit-and-release-standards.md`

This SOP covers:
- All commit types and when to use them
- Atomic commit best practices
- Commit body format (Why/How)
- Git trailers (Refs, Co-authored-by, etc.)
- Breaking changes format
- Pull request standards
- Merge strategies
- Version management philosophy
- Quality gates
- Common scenarios with examples

## Pull Requests

### PR Title Format
Must follow conventional commit format (becomes squash commit message):
```
<type>(<scope>): <description>
```

Examples:
```
feat(auth): add OAuth login flow
fix(profile): resolve user bio formatting issue
docs(api): add endpoint documentation
```

### Merge Strategy
- **Default: Squash and merge** - Feature branches, bug fixes, docs, chores
- **Exception: Merge commit** - Hotfixes only (preserves production deployment context)
- **Never: Rebase to main** - Not allowed

## Release Process

### Automated via semantic-release
- **Triggers**: Push to `main` branch
- **Versioning**: Automatic based on conventional commits
- **Changelog**: Auto-generated from commit messages
- **GitHub Releases**: Created automatically with release notes

### Version Bumps
- `fix`, `perf` → PATCH (1.0.X)
- `feat` → MINOR (1.X.0)
- `BREAKING CHANGE` → MAJOR (X.0.0) - **Requires manual approval**

### MAJOR Version Philosophy
MAJOR versions are **deliberate milestones**, not automatic:
- Breaking changes can be committed
- They accumulate until team lead triggers MAJOR release
- Allows batching multiple breaking changes
- MAJOR versions become product/marketing events

## CI/CD Pipeline

### On Pull Request
- ✅ Biome linting
- ✅ TypeScript compilation
- ✅ Build verification
- ✅ Tests (when added)

### On Merge to Main
- ✅ All PR checks
- ✅ semantic-release runs
- ✅ Version bumped (if applicable)
- ✅ CHANGELOG.md updated
- ✅ GitHub release created
- ✅ Git tag created

## Environment Variables

(To be added as needed)

```bash
# .env.local (not committed)
NEXT_PUBLIC_POSTHOG_KEY=xxx
NEXT_PUBLIC_POSTHOG_HOST=xxx
```

## Dependencies Management

### Adding Dependencies
```bash
# Install and commit separately
npm install package-name
git add package.json package-lock.json
git commit -m "chore(deps): add package-name"
```

### Updating Dependencies
```bash
# Update specific package
npm update package-name
git commit -m "chore(deps): update package-name to vX.X.X"

# Update all dependencies
npm update
git commit -m "chore(deps): update all dependencies"
```

## Testing Strategy

(To be implemented)
- **Vitest** - Unit and integration tests
- **Playwright** - E2E tests
- **React Testing Library** - Component tests

## Deployment

### Platform
- **Vercel** - Primary deployment platform
- **Automatic deployments** - Every push to `main`
- **Preview deployments** - Every pull request
- **Custom domains** - TBD

### Environment
- **Production**: `main` branch
- **Preview**: All pull requests

## Performance Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **INP (Interaction to Next Paint)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Lighthouse Score**: > 90

## Accessibility Standards

- **WCAG 2.2 Level AA** - Minimum compliance
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard navigation**: All interactive elements accessible
- **Screen reader support**: Semantic HTML and ARIA labels
- **Focus indicators**: Visible focus states on all interactive elements

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome for Android
- **Progressive enhancement**: Core functionality works without JavaScript

## Team Workflow

1. **Pull latest** - `git pull origin main`
2. **Create branch** - `git checkout -b feat/feature-name`
3. **Make changes** - Follow atomic commit principles
4. **Commit often** - One logical change per commit
5. **Push branch** - `git push origin feat/feature-name`
6. **Create PR** - With conventional commit title
7. **Wait for CI** - All checks must pass
8. **Code review** - Address feedback
9. **Merge** - Squash and merge (or merge commit for hotfixes)

## Common Issues & Solutions

### Pre-commit hook fails
```bash
# Run checks manually to see errors
npm run lint
npm run type-check

# Fix automatically (when possible)
npm run format
```

### Commit message rejected
```bash
# Check the commit message format
# Must follow: <type>[(scope)]: <subject>

# Examples:
git commit -m "feat(auth): add login"  # ✅ Good
git commit -m "added login feature"    # ❌ Bad
```

### TypeScript errors
```bash
# Check errors
npm run type-check

# Common fixes:
# - Add proper types instead of 'any'
# - Import types with 'import type'
# - Fix missing dependencies in hooks
```

## Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Biome Docs](https://biomejs.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

### Internal Docs
- **Commit Standards**: `.claude/docs/SOPs/commit-and-release-standards.md` 🚨 **READ THIS**

## Support & Questions

For questions about:
- **Commit format**: Read the SOP first, then ask team lead
- **Architecture decisions**: Consult this document and team lead
- **Code review**: Tag reviewers in PR comments
- **CI/CD issues**: Check GitHub Actions logs first

---

**Last Updated**: 2025-01-17
**Maintained by**: Asterisk Team
