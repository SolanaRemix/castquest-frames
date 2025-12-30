# GitHub Copilot Instructions for CastQuest Frames

## Project Overview

CastQuest Frames is a Web3-native social photo protocol combining:
- **Chain-first**: Built on Base with multi-chain EVM support
- **Creator-first**: Onchain minting, collecting, royalties, and programmable fees
- **Builder-first**: Frames, SDK, and a Remix-style module builder
- **AI-native**: Smart Brain agents for pricing, previews, tagging, and system optimization

This is a TypeScript monorepo managing multiple applications and packages using pnpm workspaces.

## Repository Structure

```
apps/
  web/         - Next.js user-facing app (feed, profiles, frames)
  admin/       - Next.js admin app (fees, templates, AI settings)
  mobile/      - React Native / Expo app (future)

packages/
  contracts/   - Solidity contracts (Base + EVM, using Foundry)
  sdk/         - CastQuest SDK for protocol integration
  neo-ux-core/ - Shared UI components & Neon Glass design system
  ai-brain/    - Multi-agent Smart Brain orchestration
  core-services/ - Backend services and database layer
  frames/      - Farcaster Frame protocol support
  strategy-worker/ - Background job processing

scripts/       - Development and deployment automation scripts
docs/          - Documentation, whitepapers, and technical guides
examples/      - Example frame definitions and usage
```

## Technology Stack

### Core Technologies
- **Language**: TypeScript 5.x (strict mode off for flexibility)
- **Package Manager**: pnpm 9.x (required)
- **Node.js**: 20.x+ (specified in `.nvmrc`)
- **Monorepo**: pnpm workspaces

### Frontend
- **Framework**: Next.js 14.x with App Router
- **React**: 18.2.x
- **UI Library**: Custom "Neon Glass" design system (`neo-ux-core`)
- **Styling**: CSS-in-JS with glow effects and dark mode

### Backend
- **ORM**: Drizzle ORM for database operations
- **API**: Next.js API routes and standalone services
- **Blockchain**: viem for EVM interactions

### Smart Contracts
- **Framework**: Foundry (forge, cast, anvil)
- **Chain**: Base L2 with multi-chain EVM support
- **Language**: Solidity

### AI/Automation
- **Smart Brain**: Event-driven AI orchestration system
- **Workers**: Autonomous background workers for processing

## Development Setup

### Prerequisites
```bash
# Use nvm to install Node.js 20
nvm install 20
nvm use 20

# Install pnpm globally
npm install -g pnpm@9
```

### Installation
```bash
# Install all dependencies
pnpm install

# Verify system health
bash scripts/master.sh health
```

### Development Commands
```bash
# Start admin app (port 3001)
pnpm dev:admin

# Start web app (port 3000)
pnpm dev:web

# Start docs site
pnpm docs:dev

# Build all packages
pnpm build

# Build specific package
pnpm --filter @castquest/sdk build
```

### Specialized Build Scripts
```bash
# Build all UI packages
bash scripts/ui.sh

# Build backend packages
bash scripts/api.sh

# Validate AI components
bash scripts/ai.sh

# Run contracts tests
bash scripts/contracts.sh

# Self-healing utilities
bash scripts/healer.sh
```

## Coding Standards & Conventions

### TypeScript
- Use TypeScript for all new code
- Prefer type safety but `strict: false` is acceptable for rapid iteration
- Use `interface` for public APIs, `type` for unions and complex types
- Export types alongside implementations

### Naming Conventions
- **Components**: PascalCase (e.g., `DashboardStat`, `GlowButton`)
- **Files**: kebab-case for directories, PascalCase for React components
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Packages**: @castquest/package-name format
- **Project Name**: Always use "CastQuest" or "CAST QUEST", never "COSMOS"

### Component Structure
- Use the Neon Glass design system from `@castquest/neo-ux-core`
- Prefer composition over inheritance
- Keep components focused and single-purpose
- Co-locate types with components when possible

### Import Organization
```typescript
// 1. External dependencies
import { useState } from 'react'
import { NextPage } from 'next'

// 2. Workspace packages
import { GlowButton, DashboardStat } from '@castquest/neo-ux-core'
import { FramesClient } from '@castquest/sdk'

// 3. Local imports
import { localHelper } from './utils'
```

### Code Style
- Use 2 spaces for indentation
- Prefer arrow functions for callbacks and short functions
- Use async/await over promises chains
- Keep functions focused and testable
- Add JSDoc comments for public APIs

## Smart Brain Guidelines

The Smart Brain is the AI orchestration system. When working with it:

- **Audit-first design**: No auto-execution without explicit flags
- **Event-driven**: Use EventEmitter pattern for all AI operations
- **Observable**: All decisions should be logged and traceable
- **Safe defaults**: Feature flags for potentially dangerous operations
- **Pattern discovery**: Focus on analysis and suggestions, not automatic execution

### Smart Brain Components
- `SmartBrainEngine` - Core AI orchestration
- `OracleDBService` - Database integration for AI insights
- `AutonomousWorkerSystem` - Background task management
- Pattern recognition and risk scoring systems

## Frame Protocol

Frames are the core content unit in CastQuest:

- Follow Farcaster Frame specification
- Use typed schemas for validation
- Keep frames deterministic and composable
- Support both static and dynamic frames
- Include proper metadata and OpenGraph tags

## Security & Safety

### Required Practices
- **RBAC**: Use the permissions system for access control
- **Input validation**: Validate all user inputs and external data
- **Sanitization**: Sanitize data before database operations
- **Feature flags**: Gate dangerous operations behind flags
- **Audit logging**: Log all critical operations

### Permissions System
- Predefined roles: ADMIN, OPERATOR, VIEWER
- Use `PermissionsService` from SDK
- Check permissions before sensitive operations
- Log all permission checks and changes

## Database & Services

### Drizzle ORM Usage
- Define schemas in `packages/core-services/src/db/schema/`
- Use typed queries
- Handle connection pooling through `OracleDBService`
- Prefer transactions for multi-step operations

### Service Architecture
- Services are in `packages/core-services/src/services/`
- Each service should have a clear responsibility
- Use dependency injection where appropriate
- Keep business logic in services, not API routes

## Testing Guidelines

### When to Test
- Add tests for new business logic
- Add tests for complex algorithms
- Add tests for public SDK APIs
- Integration tests for critical user flows

### Test Organization
- Co-locate tests with source files (`.test.ts` or `.spec.ts`)
- Use descriptive test names
- Mock external dependencies
- Keep tests focused and independent

## Monorepo Best Practices

### Workspace Dependencies
- Use `workspace:*` for internal package references
- Keep versions synchronized across workspace
- Run builds from root when dependencies change

### Package Boundaries
- Packages should not have circular dependencies
- `sdk` should not depend on `apps/*`
- Shared UI goes in `neo-ux-core`, not in apps
- Business logic in `core-services`, not scattered

### Building
- Build order matters: `neo-ux-core` → `sdk` → `core-services` → `apps`
- Use `pnpm -r build` for full rebuild
- Use filter for targeted builds: `pnpm --filter @castquest/sdk build`

## Common Tasks

### Adding a New Component
1. Create in `packages/neo-ux-core/src/components/`
2. Export from `packages/neo-ux-core/src/index.ts`
3. Build: `pnpm --filter @castquest/neo-ux-core build`
4. Use in apps with: `import { Component } from '@castquest/neo-ux-core'`

### Adding a New API Endpoint
1. Create route in `apps/admin/app/api/` or `apps/web/app/api/`
2. Use services from `@castquest/core-services`
3. Add type definitions
4. Test manually and with integration tests

### Adding a New Frame
1. Define frame structure in `packages/frames/`
2. Follow Farcaster Frame spec
3. Add validation schemas
4. Create renderer
5. Add to examples for testing

### Deploying
1. Test build: `DRY_RUN=true bash scripts/master.sh deploy production`
2. Run actual deploy: `bash scripts/master.sh deploy production`
3. Monitor with health checks

## Troubleshooting

### Build Issues
- Run `bash scripts/healer.sh` for auto-fixes
- Check Node.js version with `node -v` (must be 20+)
- Clear builds: `pnpm -r clean` then rebuild
- Check for import path issues

### Type Errors
- TypeScript is configured with `strict: false` to allow rapid iteration
- Focus on functionality first, type correctness second
- Don't block on minor type issues if build succeeds
- Can be fixed incrementally as the codebase matures

### Port Conflicts
- Web app: port 3000
- Admin app: port 3001
- Core services: port 4000
- Use `scripts/master.sh` port management if needed

## Documentation

- Keep README.md files updated in each package
- Document public APIs with JSDoc
- Update CHANGELOG.md for significant changes
- Add examples for new features
- Generate SDK docs with `pnpm docs:generate`

## Git Workflow

- Create feature branches from main
- Use conventional commit messages
- Keep commits focused and atomic
- Reference issues in commit messages
- Ensure all builds pass before merging

## Resources

- **Main Documentation**: `/docs/` directory
- **Architecture Docs**: `/docs/architecture/`
- **SDK Docs**: Generated with typedoc, served via docs-site
- **Contributing Guide**: `CONTRIBUTING.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`

## Key Principles

1. **Modularity**: Everything should be composable and reusable
2. **Type Safety**: Use TypeScript features, but don't block on strict typing
3. **Developer Experience**: Fast builds, clear errors, helpful tooling
4. **Security**: Audit-first, no auto-execution, permission checks
5. **Consistency**: Follow existing patterns and conventions
6. **Documentation**: Code should be self-documenting with clear names
7. **AI-Native**: Leverage Smart Brain for insights, not automatic execution

## Questions or Issues?

- Check `CONTRIBUTING.md` for contribution guidelines
- Review `IMPLEMENTATION_SUMMARY.md` for system architecture
- See `SMART_BRAIN_PROMPT.md` for AI-specific guidelines
- Look at existing code for examples and patterns
