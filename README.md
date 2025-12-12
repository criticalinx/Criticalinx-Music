# Uplifting Vibes - Phase 1

A positive-only music platform for independent artists to upload, stream, sell, and engage with fans. Artists keep 99% of revenue.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Database**: Supabase (Postgres + Realtime)
- **Payments**: Stripe Connect & Billing
- **Hosting**: Netlify (with serverless functions)
- **Storage**: Supabase Storage (configurable to Netlify Blobs)

## Brand Colors

- Matte Blue (primary): `#2A4E7B`
- Burnt Orange (accent): `#C25A1C`
- Charcoal Gray: `#1C1E21`
- Ice Gray: `#F2F4F6`
- Soft White: `#FFFFFF`

## Project Structure

```
/app                    # Next.js App Router pages
  /auth                 # Authentication pages
  /discover             # Music discovery
  /upload               # Track upload
  /track/[id]           # Track detail page
  /dashboard            # User/artist dashboard
  /admin                # Admin panel

/components             # React components
  /layout              # Header, Footer
  /player              # Music player
  /ui                  # shadcn/ui components

/lib                   # Utility functions
  supabase.ts          # Supabase client
  stripe.ts            # Stripe utilities

/netlify/functions     # Serverless functions
  stripe-webhook.ts    # Stripe webhook handler
  upload-token.ts      # Secure upload tokens

/types                 # TypeScript type definitions
/public/assets         # Logo and static assets
```

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@upliftingvibes.com
```

## Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Supabase**:
   - The database schema is already applied
   - Tables: users, artists, tracks, track_files, purchases, payouts, comments, flags, subscriptions, analytics_events
   - All RLS policies are configured

3. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase and Stripe credentials

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Access the app**:
   - Open [http://localhost:3000](http://localhost:3000)

## Netlify Deployment

1. **Connect repository to Netlify**:
   - Import project from Git
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Configure environment variables**:
   - Add all variables from `.env.example` in Netlify dashboard
   - Set `NEXT_PUBLIC_APP_URL` to your production domain

3. **Enable Netlify Functions**:
   - Functions are auto-deployed from `/netlify/functions`

4. **Configure Stripe webhook**:
   - Add webhook endpoint: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`
   - Select events: checkout.session.completed, account.updated, customer.subscription.*

## Database Schema

The Supabase database includes:

### Core Tables
- **users**: User profiles and roles
- **artists**: Artist-specific information and Stripe accounts
- **tracks**: Music track metadata
- **track_files**: Audio file storage references (original, HLS)
- **purchases**: Transaction records with revenue split
- **payouts**: Artist payout tracking

### Community
- **comments**: Threaded discussions per track
- **flags**: Content moderation flags
- **subscriptions**: Premium fan subscriptions ($5/month)
- **analytics_events**: User interaction tracking

### RPC Functions
- `get_artist_analytics(artist_id)`: Returns aggregate analytics
- `process_track_purchase(...)`: Handles 99%/1% revenue split

## Key Features

### For Artists
- ✅ Upload tracks with drag-and-drop
- ✅ Set pricing or offer free streaming
- ✅ 99% revenue share (1% platform fee)
- ✅ Weekly automated payouts via Stripe Connect
- ✅ Real-time analytics dashboard

### For Fans
- ✅ Stream free tracks
- ✅ Purchase tracks for offline access
- ✅ Premium subscription ($5/month) for early access
- ✅ Comment and engage with artists
- ✅ Flag inappropriate content

### Platform
- ✅ 99% automated operations
- ✅ Community moderation system
- ✅ HLS streaming for audio playback
- ✅ Secure file uploads with ClamAV scanning
- ✅ Real-time discussion threads

## Revenue Model

- **Platform Fee**: 1% of all track sales
- **Artist Revenue**: 99% of track sales
- **Premium Subscription**: $5/month (fan benefits)
- **Payouts**: Automated weekly via Stripe Connect

## Content Moderation

### Flag Reasons
1. Not uplifting
2. Violent/hateful content
3. Spam/low-quality

### Moderation Flow
1. User flags content → Moderation queue
2. Admin receives email alert (if threshold exceeded)
3. Auto-hide after 24 hours if unreviewed
4. Admin can review and take action

## Security Features

- ✅ HTTPS mandatory
- ✅ Row-level security (RLS) on all tables
- ✅ Secure file uploads with signed tokens
- ✅ ClamAV virus scanning
- ✅ Rate limiting on uploads, plays, comments
- ✅ GDPR-compliant cookie handling
- ✅ Minimum age: 13+

## Customization

### Update Brand Colors
Edit `/tailwind.config.ts` and `/app/globals.css`:

```typescript
colors: {
  brand: {
    blue: '#2A4E7B',    // Primary
    orange: '#C25A1C',  // Accent
    // ... other colors
  }
}
```

### Replace Logo
Update SVG files in `/public/assets/`:
- `logo-full.svg` - Full logo with text
- `logo-icon.svg` - Icon only

### Switch Storage Backend
To use Netlify Blobs instead of Supabase Storage:
1. Install: `npm install @netlify/blobs`
2. Update upload functions in `/netlify/functions/`
3. Configure storage bucket in Netlify dashboard

## Testing

Run type checking:
```bash
npm run typecheck
```

Build for production:
```bash
npm run build
```

## Support

For issues or questions:
- GitHub Issues: [repository-url]
- Email: support@upliftingvibes.com
- Community: [community-link]

## License

Proprietary - All rights reserved