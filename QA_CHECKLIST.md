# QA & Launch Checklist - Uplifting Vibes

## Pre-Launch Testing

### Authentication & User Management
- [ ] User can sign up with email
- [ ] User can sign in with existing account
- [ ] User can sign out
- [ ] User profile displays correctly
- [ ] Password reset flow works
- [ ] Email verification (if enabled)

### Artist Onboarding
- [ ] Artist can create artist profile
- [ ] Stripe Connect onboarding flow completes
- [ ] Artist dashboard loads with correct data
- [ ] Artist can view onboarding status

### Track Upload
- [ ] Upload form validates required fields
- [ ] Drag-and-drop upload works
- [ ] File upload progress displays
- [ ] Upload completes successfully
- [ ] Audio file stored correctly
- [ ] Track metadata saved to database
- [ ] Cover art upload works (if implemented)
- [ ] Genre and vibe selections save correctly
- [ ] Price can be set or left as free

### Music Discovery
- [ ] Discover page loads all tracks
- [ ] Search functionality works
- [ ] Trending section populates
- [ ] Staff picks display
- [ ] Filters work (genre, vibe)
- [ ] Track cards display correctly
- [ ] Pagination works (if implemented)

### Track Playback
- [ ] Track detail page loads
- [ ] Play button starts playback
- [ ] Pause button works
- [ ] Progress bar updates during playback
- [ ] Volume control works
- [ ] Track skipping works (if playlist)
- [ ] HLS streaming loads without errors
- [ ] Playback works on mobile

### Purchases & Payments
- [ ] Purchase button displays correct price
- [ ] Stripe Checkout loads
- [ ] Test payment completes successfully
- [ ] Purchase recorded in database
- [ ] Revenue split calculated correctly (99%/1%)
- [ ] Download link unlocked after purchase
- [ ] Receipt/confirmation sent (if implemented)

### Subscriptions
- [ ] Premium subscription page loads
- [ ] Stripe subscription checkout works
- [ ] Subscription status updates in database
- [ ] Premium features unlock for subscribers
- [ ] Subscription can be cancelled
- [ ] Cancelled subscription retains access until period end

### Comments & Discussion
- [ ] Comments display on track page
- [ ] User can post comment
- [ ] User can edit own comment
- [ ] User can delete own comment
- [ ] Reply functionality works
- [ ] Comments update in real-time (Supabase Realtime)
- [ ] Comment timestamps display correctly

### Content Moderation
- [ ] Flag button displays on tracks and comments
- [ ] Flag modal shows reason options
- [ ] Flag submission creates database record
- [ ] Moderation queue displays for admins
- [ ] Admin can review flags
- [ ] Admin can hide/approve content
- [ ] Auto-hide after 24 hours works
- [ ] Email alerts sent at threshold

### Analytics
- [ ] Artist can view play count
- [ ] Purchase count displays correctly
- [ ] Revenue totals are accurate
- [ ] Analytics events tracked in database
- [ ] Admin dashboard shows platform metrics
- [ ] Charts and graphs render correctly

### Payouts
- [ ] Weekly payout calculation runs
- [ ] Payout amount calculated correctly
- [ ] Stripe payout initiated
- [ ] Payout status updates in database
- [ ] Artist notified of payout (if implemented)
- [ ] Failed payouts handled gracefully

### Admin Features
- [ ] Admin can access admin dashboard
- [ ] Platform fee control works (default 1%)
- [ ] Moderation queue functional
- [ ] Global analytics display
- [ ] Admin can hide/show tracks
- [ ] Admin receives alert emails
- [ ] User role management works

## Security Testing

- [ ] RLS policies prevent unauthorized access
- [ ] File uploads scan for malware (ClamAV)
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] CSRF protection enabled
- [ ] Rate limiting works on uploads
- [ ] Rate limiting works on API calls
- [ ] Sensitive data not exposed in logs
- [ ] Environment variables not in client bundle
- [ ] HTTPS enforced on all pages

## Performance Testing

- [ ] Homepage loads in < 3 seconds
- [ ] Image assets optimized
- [ ] Audio streaming starts quickly
- [ ] Database queries optimized with indexes
- [ ] No N+1 query issues
- [ ] Page size < 1MB (excluding audio)
- [ ] Lighthouse score > 80
- [ ] Mobile performance acceptable

## Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Responsive Design

- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px - 1024px)
- [ ] Large desktop (1025px+)
- [ ] All components render correctly at breakpoints
- [ ] Touch targets are 44x44px minimum on mobile

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Alt text on all images
- [ ] ARIA labels on interactive elements
- [ ] Color contrast meets WCAG AA
- [ ] Form validation messages clear
- [ ] No auto-playing audio without permission

## Error Handling

- [ ] 404 page displays for invalid routes
- [ ] Network errors show friendly message
- [ ] Upload failures handled gracefully
- [ ] Payment failures show clear error
- [ ] Database connection errors caught
- [ ] Form validation errors display inline
- [ ] Console free of errors in production

## Configuration & Environment

- [ ] All environment variables set in production
- [ ] Stripe keys are production keys
- [ ] Supabase using production project
- [ ] Webhook URLs point to production
- [ ] Email service configured (if used)
- [ ] CDN configured (if used)
- [ ] SSL certificate valid
- [ ] Domain configured correctly

## Data & Database

- [ ] Database backup scheduled daily
- [ ] Migration history recorded
- [ ] Seed data removed (if any)
- [ ] Test data cleared
- [ ] Database indexes created
- [ ] RLS policies active on all tables
- [ ] Foreign key constraints in place

## Legal & Compliance

- [ ] Terms of Service page exists
- [ ] Privacy Policy page exists
- [ ] Cookie consent banner (GDPR)
- [ ] Age verification (13+ minimum)
- [ ] Copyright notice in footer
- [ ] DMCA contact information
- [ ] Content guidelines published

## Monitoring & Logging

- [ ] Error tracking configured (Sentry, etc.)
- [ ] Server logs accessible
- [ ] Function logs in Netlify dashboard
- [ ] Database slow query monitoring
- [ ] Uptime monitoring configured
- [ ] Analytics tracking (if desired)

## Documentation

- [ ] README.md complete
- [ ] HANDOFF.md provided to team
- [ ] API documentation (if external API)
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide available

## Launch Day

- [ ] Deploy to production
- [ ] Verify all pages load
- [ ] Test critical user flows
- [ ] Monitor error logs
- [ ] Check webhook delivery
- [ ] Verify email delivery (if applicable)
- [ ] Announce launch
- [ ] Monitor user feedback
- [ ] Be available for hotfixes

## Post-Launch (Week 1)

- [ ] Monitor error rates
- [ ] Check payout execution
- [ ] Review moderation queue
- [ ] Verify analytics tracking
- [ ] Collect user feedback
- [ ] Address critical bugs
- [ ] Plan Phase 2 features

## Notes

- Test with real Stripe test cards: `4242 4242 4242 4242`
- Use Stripe webhook testing CLI during development
- Clear browser cache between major updates
- Test with real audio files of various formats and sizes
- Have a rollback plan if critical issues found