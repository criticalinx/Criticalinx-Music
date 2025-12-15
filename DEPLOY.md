# Deploying to Netlify

## Prerequisites
- Node.js installed
- Netlify CLI installed: `npm install -g netlify-cli`

## Deployment Steps

### 1. Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

### 2. Login to Netlify
```bash
netlify login
```

### 3. Initialize your site (first time only)
```bash
netlify init
```

Follow the prompts:
- Create & configure a new site
- Choose your team
- Enter a site name (or leave blank for random name)
- Build command: `npm run build`
- Directory to deploy: `.next`

### 4. Set Environment Variables
```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your-supabase-url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-supabase-anon-key"
netlify env:set STRIPE_SECRET_KEY "your-stripe-secret-key"
```

Or add them in the Netlify dashboard: Site Settings → Environment Variables

### 5. Deploy
```bash
netlify deploy --prod
```

## Automatic Deployments (Recommended)

For automatic deployments on every Git push:

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider
5. Select your repository
6. Netlify will auto-detect Next.js configuration
7. Add environment variables in Site Settings
8. Deploy!

Every push to your main branch will trigger a new deployment automatically.

## Troubleshooting

### Error: "Please drop a folder containing an index.html file"
This means you're trying to drag-and-drop deploy a Next.js app. Use Git or CLI deployment instead.

### Build fails
- Check that all environment variables are set in Netlify
- Verify the build succeeds locally with `npm run build`
- Check the Netlify build logs for specific errors

### Functions not working
- Ensure `netlify.toml` is in your project root
- Check that functions are in the `netlify/functions` directory
- Verify function syntax matches Netlify Functions format
