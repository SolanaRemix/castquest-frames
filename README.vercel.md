# Vercel Configuration Notes

## Security Considerations

### CORS Configuration

⚠️ **IMPORTANT**: The `vercel.json` file currently allows all origins (`*`) for API routes. This is acceptable for development but **should be restricted in production**.

To restrict CORS to specific domains, update `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://your-domain.com"
        }
      ]
    }
  ]
}
```

Or use environment variables (recommended):

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "$CORS_ORIGIN"
        }
      ]
    }
  ]
}
```

Then set `CORS_ORIGIN` in Vercel environment variables to your production domain.

### Multiple Domains

If you need to allow multiple domains, implement CORS handling in your API routes instead of `vercel.json`:

```typescript
// apps/web/app/api/middleware.ts
const allowedOrigins = [
  'https://your-domain.com',
  'https://admin.your-domain.com',
];

export function corsMiddleware(origin: string | undefined) {
  if (origin && allowedOrigins.includes(origin)) {
    return origin;
  }
  return allowedOrigins[0];
}
```

## Configuration Options

### Node.js Runtime

The project is configured to use Node.js 22.x:

```json
{
  "functions": {
    "apps/web/app/api/**/*.ts": {
      "runtime": "nodejs22.x",
      "maxDuration": 30
    }
  }
}
```

### Function Timeout

Default timeout is 30 seconds. For longer operations:
- Increase `maxDuration` (max 300s on Pro plan)
- Or move to background jobs/queue system

### Build Configuration

The build process:
1. Installs dependencies with `pnpm install --frozen-lockfile`
2. Changes to `apps/web` directory
3. Runs `pnpm run build`

This ensures workspace dependencies are properly resolved.

## Environment Variables

Required environment variables must be set in Vercel dashboard before deployment:

### Critical Variables
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_PRIVY_APP_ID` - Authentication
- `JWT_SECRET` - Session security
- `API_SECRET_KEY` - API authentication

See `.env.example` files in each app for complete lists.

## Deployment Checklist

Before deploying to production:

- [ ] Update CORS configuration in `vercel.json`
- [ ] Set all required environment variables in Vercel
- [ ] Replace placeholder values in environment variables
- [ ] Configure custom domain
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Test API endpoints with production credentials
- [ ] Verify database connectivity from Vercel
- [ ] Check that all secrets are properly secured
- [ ] Enable Vercel Analytics
- [ ] Set up proper logging

## Troubleshooting

### Build Fails
- Check Node.js version (should be 22+)
- Verify all workspace dependencies exist
- Check build logs in Vercel dashboard

### API Routes Return 500
- Verify environment variables are set
- Check database connectivity
- Review function logs in Vercel

### CORS Errors
- Update `vercel.json` with correct origins
- Implement dynamic CORS in API routes
- Check browser console for specific errors

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
