# RedBridge - Blood Donation Finder

RedBridge is a full-stack blood donation platform where users can register as donors, search for donors by location and blood group, and admins can manage the approval workflow.

## Project at a Glance

- **Frontend:** React + Vite (`Client-Side`)
- **Backend:** Node.js + Express + TypeScript (`Server-Side`)
- **Database:** MongoDB (Mongoose)
- **Auth:** Firebase Authentication (token verification via Firebase Admin SDK)
- **Deployment:** Vercel (Frontend SPA + Backend serverless API)

## What This Project Does

- User registration via Firebase (roles: `admin`, `donor`)
- Donor profile creation with blood type, location, and phone number
- Admin approval workflow — donors start as `pending`, admin approves or rejects
- Public donor search with filters (blood type, division, district, upazila)
- Bangladesh location APIs (division → district → upazila)

## Application Flow

```
Public User (no login required)
  ├── Browse approved donors
  ├── View donor details
  └── Browse locations

Logged-in User (Firebase auth)
  ├── Register in database
  ├── Submit donor form → status: "pending"
  └── Update own donor profile

Admin (Firebase auth + admin role)
  ├── View all users
  ├── Update user roles
  ├── Approve / Reject donors
  └── Delete donors
```

## Repository Structure

```
RedBridge/
├── Client-Side/          # React frontend app
│   ├── src/
│   │   ├── Components/   # UI components (Auth, Shared, Static, Errors)
│   │   ├── Firebase/     # Firebase config
│   │   ├── Hooks/        # Custom hooks (useAxios, useDocumentTitle)
│   │   ├── Layout/       # Page layouts (Home, Admin)
│   │   └── Router/       # Route definitions
│   └── vercel.json       # Vercel SPA config
│
├── Server-Side/          # Express REST API
│   ├── src/
│   │   ├── config/       # DB, Firebase, env config
│   │   ├── middlewares/   # Auth, role, error, validation
│   │   ├── modules/
│   │   │   ├── user/     # User model, service, controller, routes
│   │   │   ├── donor/    # Donor model, service, controller, routes
│   │   │   └── location/ # BD location proxy (divisions, districts, upazilas)
│   │   └── utils/        # ApiError, catchAsync, sendResponse
│   ├── api/index.ts      # Vercel serverless entry point
│   └── vercel.json       # Vercel API config
│
└── README.md
```

## Local Setup

### 1) Install Dependencies

```bash
cd Client-Side && npm install
cd ../Server-Side && npm install
```

### 2) Configure Environment Variables

**Server-Side `.env`:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blood-donation-finder
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
CORS_ORIGIN=http://localhost:5173
```

**Client-Side `.env`:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### 3) Run Development Servers

```bash
# Terminal 1 — Backend
cd Server-Side
npm run dev

# Terminal 2 — Frontend
cd Client-Side
npm run dev
```

---

## API Endpoints

### Base URL: `/api`

All protected routes require: `Authorization: Bearer <firebase_id_token>`

### System

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| GET | `/health` | Public | API health/uptime status |

### Users

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| POST | `/api/users` | Public | Register user (after Firebase auth) |
| GET | `/api/users` | Admin | Get all users |
| PATCH | `/api/users/:id/role` | Admin | Update user role (`admin` or `donor`) |

### Donors

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| POST | `/api/donors` | Authenticated | Create donor profile (status: pending) |
| GET | `/api/donors` | Public | Search approved donors (with filters) |
| GET | `/api/donors/:id` | Public | Get donor details |
| PUT | `/api/donors/:id` | Owner | Update own donor profile |
| DELETE | `/api/donors/:id` | Admin | Delete donor |
| PATCH | `/api/donors/:id/approve` | Admin | Approve donor |
| PATCH | `/api/donors/:id/reject` | Admin | Reject donor |

**Donor search query params:** `?bloodType=O+&division=Dhaka&district=Dhaka&upazila=Dhanmondi`

### Locations

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| GET | `/api/locations` | Public | Full location tree |
| GET | `/api/locations/divisions` | Public | All 8 divisions |
| GET | `/api/locations/districts/:divisionName` | Public | Districts of a division |
| GET | `/api/locations/upazilas/:districtName` | Public | Upazilas of a district |

> Full API examples with request/response bodies available in [`Server-Side/API_DOCUMENTATION.md`](Server-Side/API_DOCUMENTATION.md)

### Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, React Router, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Authentication | Firebase Auth + Firebase Admin SDK |
| Deployment | Vercel (SPA + Serverless) |
| Location Data | [BD APIs](https://bdapis.com/api/v1.2) |

---

## Vercel Deployment

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel organization/team ID |
| `VERCEL_FRONTEND_PROJECT_ID` | Vercel project ID for Client-Side |
| `VERCEL_BACKEND_PROJECT_ID` | Vercel project ID for Server-Side |

### Setup Steps

1. Run `npx vercel login` and `npx vercel link` in both `Client-Side` and `Server-Side`
2. Get `orgId` and `projectId` from `.vercel/project.json`
3. Create a Vercel token at **Account Settings → Tokens**
4. Add all secrets to GitHub → **Settings → Secrets and variables → Actions**
5. Add environment variables to each Vercel project from the `.env` examples above
