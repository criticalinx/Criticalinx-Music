# Developer Handoff - Uplifting Vibes

## Quick Start

1. Clone repository
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in credentials
4. Run `npm run dev`
5. Access at `http://localhost:3000`

## Environment Setup

### Required Accounts
- **Supabase**: Database and auth (already configured)
- **Stripe**: Payment processing
  - Create account at stripe.com
  - Get API keys from Dashboard > Developers > API keys
  - Set up Connect for artist payouts
- **Netlify**: Hosting and serverless functions
  - Connect GitHub repository
  - Add environment variables

### Environment Variables

| Variable | Where to Get It | Purpose |
|----------|----------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard > Settings > API | Database connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard > Settings > API | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard > Settings > API | Server-side operations |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard > Developers > API keys | Client-side Stripe |
| `STRIPE_SECRET_KEY` | Stripe Dashboard > Developers > API keys | Server-side Stripe |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard > Developers > Webhooks | Webhook verification |
| `NEXT_PUBLIC_APP_URL` | Your domain | App URL |
| `ADMIN_EMAIL` | Your email | Admin notifications |

## Database

The database is **already set up** in Supabase with all tables and policies.

### Tables Overview
- `users` - User profiles
- `artists` - Artist accounts with Stripe Connect IDs
- `tracks` - Music tracks
- `track_files` - Audio file references
- `purchases` - Transaction records
- `payouts` - Artist payout tracking
- `comments` - Discussion threads
- `flags` - Content moderation
- `subscriptions` - Premium memberships
- `analytics_events` - User interactions

### Accessing Data

```typescript
// Get current user
import { getCurrentUser } from '@/lib/supabase';
const user = await getCurrentUser();

// Query tracks
const { data: tracks } = await supabase
  .from('tracks')
  .select('*, artist(*)')
  .eq('status', 'published');
```

## Design System

### Brand Colors (Tailwind Classes)

```tsx
// Primary (Matte Blue)
className="bg-primary text-primary-foreground"
className="text-primary border-primary"

// Accent (Burnt Orange)
className="bg-accent text-accent-foreground"
className="text-accent"

// Direct hex values
className="bg-[#2A4E7B]"  // Matte Blue
className="bg-[#C25A1C]"  // Burnt Orange
```

### Logo Usage

```tsx
import Image from 'next/image';

// Full logo
<Image src="/assets/logo-full.svg" alt="Uplifting Vibes" width={200} height={60} />

// Icon only
<Image src="/assets/logo-icon.svg" alt="Uplifting Vibes" width={40} height={40} />
```

### Spacing Convention
- Section padding: `section-padding` class (px-6 py-8 / lg:px-8 lg:py-12)
- Content spacing: `criticalinx-spacing` class (space-y-6 / lg:space-y-8)
- Standard gaps: 20px, 24px, 32px

## Key Files to Know

### Configuration
- `/tailwind.config.ts` - Theme colors, spacing, animations
- `/app/globals.css` - CSS variables, utility classes
- `/netlify.toml` - Netlify build & function config

### Core Infrastructure
- `/lib/supabase.ts` - Database client
- `/lib/stripe.ts` - Payment utilities
- `/types/index.ts` - TypeScript types

### Layout
- `/components/layout/Header.tsx` - Site header
- `/components/layout/Footer.tsx` - Site footer
- `/app/layout.tsx` - Root layout

### Key Pages
- `/app/page.tsx` - Homepage
- `/app/discover/page.tsx` - Music discovery
- `/app/upload/page.tsx` - Track upload
- `/app/track/[id]/page.tsx` - Track detail

### Serverless Functions
- `/netlify/functions/stripe-webhook.ts` - Stripe events
- `/netlify/functions/upload-token.ts` - Secure uploads

## Common Tasks

### Add a New Page

1. Create file in `/app/your-page/page.tsx`
2. Export default component
3. Add navigation link in Header

```tsx
// /app/your-page/page.tsx
export default function YourPage() {
  return (
    <div className="container section-padding">
      <h1>Your Page</h1>
    </div>
  );
}
```

### Query Database

```typescript
import { supabase } from '@/lib/supabase';

// Fetch data
const { data, error } = await supabase
  .from('tracks')
  .select('*')
  .eq('status', 'published');

// Insert data
const { data, error } = await supabase
  .from('tracks')
  .insert({ title: 'New Track', artist_id: 'uuid' });
```

### Update Brand Colors

1. Edit `/tailwind.config.ts`:
```typescript
colors: {
  brand: {
    blue: '#2A4E7B',   // Change this
    orange: '#C25A1C', // Change this
  }
}
```

2. Edit `/app/globals.css`:
```css
--primary: 210 48% 32%;  /* Matte Blue in HSL */
--accent: 20 75% 44%;    /* Burnt Orange in HSL */
```

### Update Logo

Replace files in `/public/assets/`:
- `logo-full.svg` - Full wordmark logo
- `logo-icon.svg` - Icon/favicon version

Preserve the Lynx geometry if updating design.

## Deployment Checklist

### Pre-Deploy
- [ ] All environment variables set in Netlify
- [ ] Stripe webhook configured pointing to production URL
- [ ] Supabase production database has schema applied
- [ ] Test uploads, purchases, and payouts in staging
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain

### Netlify Setup
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables (all from `.env.example`)
4. Enable automatic deploys on main branch

### Stripe Configuration
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `account.updated`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payout.paid`
   - `payout.failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET` env variable

### Post-Deploy
- [ ] Verify homepage loads
- [ ] Test user signup/signin
- [ ] Test artist onboarding
- [ ] Upload test track
- [ ] Test track playback
- [ ] Test purchase flow
- [ ] Verify webhook events received
- [ ] Check error logs in Netlify Functions

## Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run typecheck

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Supabase Connection Error
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project is active
- Verify RLS policies allow operation

### Stripe Webhook Not Working
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check function logs in Netlify dashboard
- Test webhook with Stripe CLI: `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook`

### Upload Fails
- Check Supabase Storage bucket exists: `audio-files`
- Verify storage RLS policies
- Check file size limits (default 500MB)

## Feature Roadmap (Future Phases)

### Phase 2
- HLS video conversion and streaming
- Advanced analytics with charts
- Artist collaboration features
- Mobile apps (React Native)

### Phase 3
- Live streaming events
- NFT integration for limited editions
- AI-powered music recommendations
- Advanced moderation tools

## Support Contacts

- **Technical Lead**: [email]
- **Product Owner**: [email]
- **Stripe Support**: stripe.com/support
- **Supabase Support**: supabase.com/support
- **Netlify Support**: netlify.com/support

## Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)