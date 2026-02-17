# Deployment Guide

## Vercel Deployment (apps/web)

The CastQuest Frames web application is configured for seamless deployment to Vercel with production-ready settings.

### Prerequisites

- Vercel account with GitHub integration
- Repository connected to Vercel

### Configuration

The root `vercel.json` provides production-ready configuration:

- **Framework**: Next.js (automatically detected)
- **Build Command**: `pnpm --filter @castquest/web build`
- **Install Command**: `pnpm install --frozen-lockfile` (ensures reproducible builds)
- **Node.js Runtime**: 20.x (matches `.nvmrc` specification)
- **Package Manager**: pnpm 9.0.0 (specified in `package.json`)

### Deployment Steps

#### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   ```

2. **Configure Project Settings**
   - Vercel will auto-detect the `vercel.json` configuration
   - Root directory: `./` (monorepo root)
   - Framework: Next.js (auto-detected)
   - Build command: Pre-configured in `vercel.json`

3. **Deploy**
   - Push to `main` branch for production deployment
   - Push to other branches for preview deployments

#### Option 2: Manual Deployment via CLI

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

### Environment Variables

The web app requires several environment variables for full functionality. See `apps/web/.env.example` for a complete template with descriptions.

#### Required Variables

- `CASTQUEST_API_KEY` - API key for internal service authentication
- `ADMIN_API_TOKEN` - Token for administrative operations

#### Optional Variables

- `NEXT_PUBLIC_PRIVY_APP_ID` - Privy authentication app ID
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - Public API URL for client-side requests

#### Setting Up Environment Variables

**For Local Development:**
```bash
# Copy the example file
cp apps/web/.env.example apps/web/.env.local

# Edit with your values
nano apps/web/.env.local
```

**For Vercel Deployment:**
```bash
# Set environment variables via CLI
vercel env add CASTQUEST_API_KEY
vercel env add ADMIN_API_TOKEN

# Or configure in Vercel Dashboard:
# Project Settings → Environment Variables

# Pull environment variables for local development
vercel env pull apps/web/.env.local
```

**Important Notes:**
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Keep sensitive keys (API tokens, database URLs) as server-side only
- Use different values for development, preview, and production environments

### Monorepo Considerations

- The configuration builds the entire monorepo workspace
- Workspace dependencies (`@castquest/neo-ux-core`, `@castquest/core-services`) are automatically included
- The build process uses pnpm workspaces for dependency resolution

### Build Optimization

The Vercel configuration includes:

- **Frozen Lockfile**: Ensures consistent dependency versions
- **Workspace Filtering**: Only builds necessary packages
- **Node.js 20.x**: Latest LTS for optimal performance
- **API Routes**: Configured for serverless functions with nodejs20.x runtime

### Troubleshooting

#### Build Failures

```bash
# Test build locally
pnpm --filter @castquest/web build

# Check for dependency issues
pnpm install --frozen-lockfile
```

#### Environment Issues

- Ensure Node.js 20+ is used (check `.nvmrc`)
- Verify pnpm version matches `packageManager` in `package.json`
- Check that all workspace dependencies build successfully

#### API Route Issues

- API routes are located in `apps/web/app/api/`
- Functions automatically use nodejs20.x runtime
- Ensure serverless function size limits are not exceeded

### Monitoring

After deployment:

1. Check build logs in Vercel Dashboard
2. Monitor function execution and errors
3. Review analytics for performance insights

### Other Deployments

This configuration is specifically for `apps/web`. Other applications:

- `apps/admin`: Deploy separately if needed (not covered by this config)
- `apps/mobile`: Deploy via appropriate mobile app distribution channels

### Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
