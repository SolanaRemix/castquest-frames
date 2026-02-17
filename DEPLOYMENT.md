# CastQuest Deployment Guide for Vercel

This guide covers deploying the CastQuest monorepo to Vercel with Node.js 22+.

## Prerequisites

- Node.js 22.11.0 or higher
- pnpm 9.0.0 or higher
- Vercel account
- Database (PostgreSQL) hosted and accessible
- Required API keys (see Environment Variables below)

## Project Structure

```
castquest-frames/
├── apps/
│   ├── web/          # Main web application (deployed to Vercel)
│   └── admin/        # Admin dashboard
├── packages/
│   ├── core-services/ # Backend services
│   ├── neo-ux-core/   # UI components
│   ├── sdk/           # TypeScript SDK
│   └── contracts/     # Smart contracts (Foundry)
└── vercel.json        # Vercel deployment configuration
```

## Quick Start

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/castquest-frames.git
cd castquest-frames
```

### 2. Install Dependencies

```bash
# Install pnpm if you haven't already
npm install -g pnpm@9.0.0

# Install project dependencies
pnpm install --frozen-lockfile
```

### 3. Configure Environment Variables

Copy the example files and update with your values:

```bash
# Web app
cp apps/web/.env.example apps/web/.env.local

# Admin app
cp apps/admin/.env.example apps/admin/.env.local

# Core services
cp packages/core-services/.env.example packages/core-services/.env
```

See the [Environment Variables](#environment-variables) section below for required values.

### 4. Build Locally (Test)

```bash
# Build all packages
pnpm run build

# Run tests
pnpm test

# Type check
pnpm typecheck
```

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the `vercel.json` configuration
5. Add environment variables in the dashboard
6. Click "Deploy"

## Environment Variables

### Required Variables

All apps require these core variables. See `.env.example` files for complete lists.

#### Web App (`apps/web/.env.local`)

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Authentication
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# API
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Blockchain
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

#### Admin App (`apps/admin/.env.local`)

```bash
# All of the above, plus:
ADMIN_ADDRESSES=0xYourAdminWallet,0xAnotherAdminWallet
```

#### Core Services (`packages/core-services/.env`)

```bash
# Server
PORT=4000
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
JWT_SECRET=your_strong_random_jwt_secret
API_KEY=your_api_key

# Blockchain
RPC_URL=https://mainnet.base.org
PRIVATE_KEY=your_private_key_for_contract_interactions
```

### Optional Variables

- **OPENAI_API_KEY**: For AI-powered features (Smart Brain)
- **PINATA_API_KEY**: For IPFS storage
- **SENTRY_DSN**: For error monitoring
- **SMTP_***: For email notifications

## Vercel Configuration

The `vercel.json` file in the root configures:

- **Runtime**: Node.js 22.x
- **Build Command**: Builds the web app
- **Install Command**: Uses pnpm with frozen lockfile
- **Output Directory**: Next.js build output
- **Function Timeout**: 30 seconds max

### Custom Domains

To add a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update environment variables with new domain

## Database Setup

### PostgreSQL Database

You'll need a PostgreSQL database. Recommended providers:

- **Vercel Postgres** (built-in)
- **Supabase** (free tier available)
- **Railway** (easy setup)
- **Neon** (serverless Postgres)

#### Create Database

```sql
CREATE DATABASE castquest;
```

#### Run Migrations

```bash
# From packages/core-services
pnpm db:migrate
```

## Testing Deployment

After deployment:

1. **Health Check**: Visit `https://your-domain.vercel.app/api/health`
2. **Admin Dashboard**: Visit `https://your-domain.vercel.app/admin`
3. **Run Tests**: Check Vercel deployment logs for test results

## Troubleshooting

### Build Fails

- Check Node.js version is 22+ (see `.nvmrc`)
- Ensure all workspace dependencies are built in order
- Check for missing environment variables
- Review Vercel build logs

### Runtime Errors

- Verify DATABASE_URL is accessible from Vercel
- Check API keys are correctly set
- Review Vercel function logs
- Ensure CORS is configured properly

### Performance Issues

- Enable Vercel caching
- Use Vercel Edge Functions for API routes
- Optimize database queries
- Configure Redis for caching (optional)

## Monorepo Considerations

This is a pnpm workspace monorepo. Key points:

1. **Build Order**: Core packages must build before apps
2. **Dependencies**: Use `workspace:*` for internal packages
3. **Deployment**: Only `apps/web` is deployed to Vercel
4. **Shared Code**: Changes to `packages/*` affect all apps

## Security

### Secrets Management

- Never commit `.env` files
- Use Vercel Environment Variables for secrets
- Rotate keys regularly
- Use different keys for staging/production

### API Security

- Enable rate limiting (configured in core-services)
- Use CORS properly
- Validate all inputs
- Use HTTPS only

## Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in analytics
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Datadog**: APM and logs

## Support

- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues
- **Community**: Check repository for community links

## Next Steps

After successful deployment:

1. Configure custom domain
2. Set up monitoring
3. Configure CI/CD pipeline
4. Set up staging environment
5. Configure backup strategy
6. Test all features end-to-end

---

**Note**: Update all placeholder values in `.env` files before deployment. The provided examples use placeholder values that must be replaced with actual credentials.
