# nutterbutters.uk — Deploy Guide

## Files
- `index.html` — the entire website (single file, no dependencies)

## Deploy to Cloudflare Pages (free)

1. Go to dash.cloudflare.com → Pages → Create a project
2. Choose "Upload assets" (direct upload — no Git needed)
3. Drag the `nutterbutters-site/` folder into the upload box
4. Set project name: nutterbutters
5. Click Deploy

## Connect your domain (nutterbutters.uk)

1. After deploy → Custom domains → Add custom domain
2. Type: nutterbutters.uk
3. Cloudflare auto-configures DNS (since your domain is already on Cloudflare)
4. Done — live in ~1 minute

## Editing the site

All edits are in `index.html`. Things you'll want to update:

### Update Fiverr links
Search for `https://www.fiverr.com` → replace with your actual Fiverr gig URL

### Update prices
Search for `price-amount` → edit the numbers

### Update contact email
Search for `hello@nutterbutters.uk` → replace with your real email

### Add your Threads account screenshots
Replace the terminal mock section with actual screenshots once you have posts live

## Re-deploying after edits

Just go to Cloudflare Pages → your project → Deployments → Upload new version
Upload the updated index.html — live in 30 seconds.
