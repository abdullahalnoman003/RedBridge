# RedBridge - Blood Donation Finder

RedBridge is a full-stack blood donation platform where users can register, create donor profiles, search donors by location/blood group, and create blood requests.

## Project at a glance

- **Frontend:** React + Vite (`Client-Side`)
- **Backend:** Node.js + Express + TypeScript (`Server-Side`)
- **Database:** MongoDB (Mongoose)
- **Auth:** Firebase token verification + local JWT fallback
- **Deployment:** Vercel (Frontend SPA + Backend serverless API)
- **CI/CD:** GitHub Actions pipeline for lint, test, build, deploy

## What this project does

- User registration with role support (`admin`, `donor`, `requester`)
- Manual login and password setup/update
- Donor profile creation and donor search
- Admin donor approval/rejection workflow
- Blood request creation and admin request management
- Bangladesh location tree APIs (division -> district -> upazila)

## Repository structure

- `Client-Side/` - React UI app
- `Server-Side/` - Express REST API
- `.github/workflows/vercel-cicd.yml` - CI/CD workflow

## Local setup

### 1) Install dependencies

From project root, run in both apps:

```bash
cd Client-Side
npm install

cd ../Server-Side
npm install
```

### 2) Configure environment variables

- Client example: `Client-Side/.env.example`
- Server example: `Server-Side/.env.example`

Create local `.env` files from examples.

### 3) Run development servers

```bash
# Terminal 1
cd Server-Side
npm run dev

# Terminal 2
cd Client-Side
npm run dev
```

---

## API access guide

### Base URLs

- Local API base: `http://localhost:5000/api`
- Health check (no `/api` prefix): `http://localhost:5000/health`

### Authentication rules

- Protected routes need: `Authorization: Bearer <token>`
- Token can be:
  - Firebase ID token
  - Local JWT token from `POST /api/users/login`
- Role-based routes are enforced by middleware:
  - `admin`
  - `donor`
  - `requester`

### Standard response shape

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## API endpoints summary

### System

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/health` | Public | API health/uptime status |

### Users

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/users` | Public | Create user |
| POST | `/api/users/login` | Public | Manual login (email/password) |
| PATCH | `/api/users/set-password` | Authenticated | Set/update own password |
| GET | `/api/users` | Admin | Get all users |
| PATCH | `/api/users/:id/role` | Admin | Update user role |

### Donors

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/donors` | Authenticated | Create donor profile |
| GET | `/api/donors` | Public | Search/list donors |
| GET | `/api/donors/:id` | Public | Get donor details |
| PUT | `/api/donors/:id` | Authenticated | Update donor profile |
| DELETE | `/api/donors/:id` | Admin | Delete donor |
| PATCH | `/api/donors/:id/approve` | Admin | Approve donor |
| PATCH | `/api/donors/:id/reject` | Admin | Reject donor |

### Requests

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/requests` | Authenticated | Create blood request |
| GET | `/api/requests` | Admin | Get all blood requests |
| DELETE | `/api/requests/:id` | Admin | Delete request |

### Locations

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/locations` | Public | Full location tree |
| GET | `/api/locations/divisions` | Public | All divisions |
| GET | `/api/locations/districts/:divisionName` | Public | Districts by division |
| GET | `/api/locations/upazilas/:districtName` | Public | Upazilas by district |

> Full API examples (request/response) are available in `Server-Side/API_DOCUMENTATION.md`.

---

## CI/CD + Vercel setup

This repository includes a production-ready CI/CD pipeline for GitHub + Vercel.

### What is configured

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

### Required GitHub secrets

Add these in GitHub Repository -> Settings -> Secrets and variables -> Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_FRONTEND_PROJECT_ID`
- `VERCEL_BACKEND_PROJECT_ID`

### Quick way to get Vercel values

Run from `Client-Side`:

1. `npx vercel login`
2. `npx vercel link`
3. `npx vercel env pull .env.vercel`

After `vercel link`, local `.vercel/project.json` contains:

- `orgId` -> use as `VERCEL_ORG_ID`
- `projectId` -> use as frontend/backend project ID

Create token from Vercel: **Account Settings -> Tokens** and use it as `VERCEL_TOKEN`.

### Connect GitHub repo with Vercel

1. Open Vercel dashboard -> **Add New Project**.
2. Import this GitHub repository as **Frontend** with root directory `Client-Side`.
3. Create another Vercel project as **Backend API** with root directory `Server-Side`.
4. Keep project-specific commands from each `vercel.json` file.
5. Add environment variables from:
   - `Client-Side/.env.example` (frontend project)
   - `Server-Side/.env.example` (backend project)

### CI/CD notes

- For forked PRs, preview deployment is skipped because repository secrets are not exposed to forks.
- Backend is deployed to Vercel as serverless API in this pipeline.
- You can manually trigger production deploy from GitHub Actions using `workflow_dispatch`.
