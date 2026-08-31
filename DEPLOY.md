# Deploying Landsec Capital to Vercel

## One-Click GitHub → Vercel Deploy

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/landsec-capital.git
git push -u origin main
```

### Step 2 — Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your GitHub repository
3. Vercel auto-detects the `vercel.json` — no framework selection needed
4. Click **Deploy**

Vercel will:
- Run `pnpm install`
- Run `pnpm build:frontend` (Vite build)
- Serve `artifacts/landvest/dist/public` as the static site
- Deploy the files in `api/` as serverless functions

### Step 3 — Set Environment Variables

In your Vercel project dashboard → **Settings → Environment Variables**, add:

| Variable | Required | Description |
|---|---|---|
| `GMAIL_USER` | Yes | Gmail address for sending emails (`landseccapital@gmail.com`) |
| `GMAIL_APP_PASSWORD` | Yes | 16-character Gmail App Password (not your account password) |
| `SECURITY_EMAIL` | Yes | Email that receives admin OTP security codes |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `SESSION_SECRET` | Yes | Random secret for session signing |
| `DATABASE_URL` | Yes | PostgreSQL connection string for user accounts |

> **Getting a Gmail App Password:**
> 1. Enable 2-Step Verification on your Gmail account
> 2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 3. Create a new app password — copy the 16-character code

### Step 4 — Redeploy

After adding env vars, click **Redeploy** in the Vercel dashboard to apply them.

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start the frontend (Vite dev server)
pnpm --filter @workspace/landvest run dev

# Start the API server (Express)
pnpm --filter @workspace/api-server run dev
```

---

## Architecture

```
vercel.json               ← Vercel build config
artifacts/
  landvest/               ← React + Vite frontend (static site)
    src/                  ← All UI code
    public/               ← Static assets (favicon, certificates, video)
    dist/public/          ← Build output (served by Vercel)
  api-server/             ← Express API (used for local dev only)
api/
  user/                    ← Vercel serverless user auth endpoints
  admin/                   ← Vercel serverless admin auth endpoints
  email/                   ← Vercel serverless email endpoints
  healthz.ts               ← Vercel serverless: GET /api/healthz
```

---

## Custom Domain

1. Vercel dashboard → **Domains**
2. Add `landseccapital.com` (or your domain)
3. Update your DNS records as instructed

---

## Notes

- User registration and authentication use PostgreSQL, scrypt password hashes, and HTTP-only signed cookies
- Emails are sent via Gmail SMTP through the serverless API functions
- The Replit development database is provisioned already; Vercel needs its own hosted PostgreSQL `DATABASE_URL`
