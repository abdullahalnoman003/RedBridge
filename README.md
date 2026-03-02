# RedBridge CI/CD + Vercel Setup

This repository now includes a production-ready CI/CD pipeline for GitHub + Vercel.

## What is configured

- GitHub Actions workflow: `.github/workflows/vercel-cicd.yml`
- CI for both apps (`Client-Side`, `Server-Side`) on every push/PR to `main`
- CI gates in order:
  1. Install dependencies (`npm ci`)
  2. Lint check (`npm run lint`)
  3. Test run (`npm run test --if-present`)
  4. Production build (`npm run build`)
- Deploy blocked automatically when CI fails (`needs: ci`)
- PR preview deployment to Vercel (Frontend + Backend API)
- Production deployment to Vercel when `main` is pushed (Frontend + Backend API)
- Vercel project config for Vite SPA in `Client-Side/vercel.json`
- Vercel serverless API config in `Server-Side/vercel.json`

## Required GitHub Secrets

Add these in GitHub Repository -> Settings -> Secrets and variables -> Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_FRONTEND_PROJECT_ID`
- `VERCEL_BACKEND_PROJECT_ID`

You can get these values from Vercel after linking your project.

### Quick way to get Vercel values

Run from `Client-Side`:

1. `npx vercel login`
2. `npx vercel link`
3. `npx vercel env pull .env.vercel`

After `vercel link`, the local `.vercel/project.json` contains:

- `orgId` -> use as `VERCEL_ORG_ID`
- `projectId` -> use as either `VERCEL_FRONTEND_PROJECT_ID` or `VERCEL_BACKEND_PROJECT_ID`

Create token from Vercel: **Account Settings -> Tokens** and use it as `VERCEL_TOKEN`.

## Connect GitHub Repo with Vercel

1. Open Vercel dashboard -> **Add New Project**.
2. Import this GitHub repository as **Frontend** with root directory `Client-Side`.
3. Create another Vercel project as **Backend API** with root directory `Server-Side`.
4. Keep project-specific commands from each `vercel.json` file.
5. Add environment variables from:
  - `Client-Side/.env.example` (frontend project)
  - `Server-Side/.env.example` (backend project)

## Environment Variables

- Client env example: `Client-Side/.env.example`
- Server env example: `Server-Side/.env.example`
- Existing `.env` files are now ignored by git in both apps.

## Notes

- For forked PRs, preview deployment is skipped because repository secrets are not exposed to forks.
- Backend is deployed to Vercel as serverless API in this pipeline.
- You can manually trigger production deploy from GitHub Actions using the `workflow_dispatch` trigger.
