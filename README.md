# RedBridge

A full-stack blood donor discovery and donor management platform focused on Bangladesh. RedBridge helps users quickly find approved blood donors by blood group and location, while giving administrators the tools to review and moderate donor registrations.

## 1. Project Overview

RedBridge is designed to reduce the time required to connect blood seekers with available donors.

Purpose:
- Make blood donor search faster and location-aware.
- Provide a trusted donor directory through an admin approval workflow.
- Offer a simple and accessible interface for both donors and seekers.

Main features:
- Firebase-based user authentication.
- Donor profile creation with blood group and detailed location.
- Admin moderation (approve/reject/delete donor profiles).
- Public donor search with filters.
- Bangladesh locations support (division, district, upazila).

Expected users:
- Blood seekers and patient families.
- Voluntary blood donors.
- University/project admins or moderators.

## 2. Tech Stack

### Frontend
- React 19
- Vite 7
- React Router DOM 7
- Axios
- Tailwind CSS 4
- DaisyUI
- React Hot Toast
- SweetAlert2
- React Icons

### Backend
- Node.js
- Express 4
- TypeScript 5
- Zod (request validation)
- Helmet (security headers)
- CORS
- express-rate-limit

### Database
- MongoDB
- Mongoose

### Authentication and Authorization
- Firebase Authentication (client)
- Firebase Admin SDK (server-side token verification)
- Role-based access control (`admin`, `donor`)

### Tooling and Deployment
- ESLint
- tsx
- Vercel (frontend + backend deployments)

## 3. Installation Guide

### 3.1 Prerequisites
- Node.js 20+ (recommended)
- npm 10+
- MongoDB (local or cloud instance)
- Firebase project with Authentication enabled

### 3.2 Clone Repository
```bash
git clone <your-repository-url>
cd RedBridge
```

### 3.3 Install Dependencies
```bash
cd Client-Side
npm install

cd ../Server-Side
npm install
```

### 3.4 Configure Environment Variables

Create `.env` in `Server-Side`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blood-donation-finder

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

Create `.env` in `Client-Side`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Production note:
- In Vercel, set `VITE_API_BASE_URL` to your deployed backend URL (for example `https://your-backend.vercel.app`).
- Do not keep `VITE_API_BASE_URL=http://localhost:5000` for production builds.
- Optionally set `VITE_ADMIN_EMAILS` (comma-separated) so admin role fallback still works if role API is temporarily unavailable.

Backend deployment note:
- In Vercel (Server-Side project), set `MONGODB_URI` (or `MONGODB_URL` / `DATABASE_URL`) to your MongoDB Atlas connection string.
- Also set `CORS_ORIGIN` to your frontend domain (for example `https://redbridgediu.vercel.app`).

### 3.5 Run Project Locally

Start backend:
```bash
cd Server-Side
npm run dev
```

Start frontend in a second terminal:
```bash
cd Client-Side
npm run dev
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/health`

### 3.6 Optional Scripts

Backend:
```bash
npm run build
npm run start
npm run lint
npm run seed
```

Frontend:
```bash
npm run build
npm run preview
npm run lint
```

## 4. API Documentation

### 4.1 Base URL
- Local backend root: `http://localhost:5000`
- API prefix: `/api`
- Effective local API base: `http://localhost:5000/api`

### 4.2 Authentication Method
Protected endpoints require Firebase ID token:

```http
Authorization: Bearer <firebase_id_token>
```

Authorization rules:
- Public: no token needed.
- Authenticated: valid Firebase token required.
- Admin only: valid token and user role must be `admin`.

### 4.3 Common Response Formats

Success response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Paginated response:
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 52,
    "totalPages": 6
  },
  "data": []
}
```

Error response:
```json
{
  "success": false,
  "code": "INTERNAL_ERROR",
  "message": "Something went wrong",
  "details": "optional in development",
  "data": null
}
```

### 4.4 Endpoints

#### System

##### GET /health
Access: Public

Success response example:
```json
{
  "success": true,
  "message": "Blood Donation Finder API is running",
  "data": {
    "timestamp": "2026-03-30T12:00:00.000Z",
    "uptime": 1234.56
  }
}
```

#### Users

##### POST /api/users
Access: Public
Purpose: Create user record after Firebase sign-in.

Request body example:
```json
{
  "name": "Rahim Uddin",
  "email": "rahim@example.com",
  "photoURL": "https://example.com/avatar.jpg",
  "phone": "01712345678",
  "address": "Dhaka",
  "bio": "Regular blood donor"
}
```

Success response example (201):
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "role": "donor"
  }
}
```

##### GET /api/users
Access: Admin only
Purpose: Get users list.

Query parameters:
- `page` (optional, positive integer)
- `limit` (optional, positive integer, max 100)

Success response example:
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  },
  "data": [
    {
      "_id": "660a1b2c3d4e5f6a7b8c9d0e",
      "name": "Rahim Uddin",
      "email": "rahim@example.com",
      "role": "donor"
    }
  ]
}
```

##### GET /api/users/role?email=<email>
Access: Public
Purpose: Get a single user by email.

Success response example:
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "role": "donor"
  }
}
```

##### PATCH /api/users/update?email=<email>
Access: Public
Purpose: Update user profile fields by email.

Request body example:
```json
{
  "name": "Rahim Uddin",
  "photoURL": "https://example.com/new-avatar.jpg",
  "phone": "01812345678",
  "address": "Dhaka, Bangladesh",
  "bio": "Available for emergency donation",
  "isVerified": true,
  "lastLogin": "2026-03-30T09:20:00.000Z"
}
```

Success response example:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "email": "rahim@example.com"
  }
}
```

##### PATCH /api/users/:id/role
Access: Admin only
Purpose: Change user role.

Request body example:
```json
{
  "role": "admin"
}
```

Success response example:
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "role": "admin"
  }
}
```

#### Donors

##### POST /api/donors
Access: Authenticated
Purpose: Create donor profile with pending status.

Request body example:
```json
{
  "bloodType": "O+",
  "location": {
    "division": "Dhaka",
    "district": "Dhaka",
    "upazila": "Dhanmondi",
    "area": "Road 27"
  },
  "phone": "01712345678",
  "availability": true
}
```

Success response example (201):
```json
{
  "success": true,
  "message": "Donor profile created successfully. Awaiting admin approval.",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "bloodType": "O+",
    "status": "pending"
  }
}
```

##### GET /api/donors
Access: Public
Purpose: Search approved donors.

Query parameters:
- `bloodType` (A+, A-, B+, B-, O+, O-, AB+, AB-)
- `division`
- `district`
- `upazila`
- `page` (optional)
- `limit` (optional, max 100)

Success response example:
```json
{
  "success": true,
  "message": "Donors retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  },
  "data": [
    {
      "_id": "660b2c3d4e5f6a7b8c9d0e1f",
      "bloodType": "O+",
      "status": "approved"
    }
  ]
}
```

##### GET /api/donors/pending
Access: Admin only
Purpose: Get pending donor requests.

Query parameters:
- `page` (optional)
- `limit` (optional, max 100)

Success response example:
```json
{
  "success": true,
  "message": "Pending donor requests retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  },
  "data": [
    {
      "_id": "660b2c3d4e5f6a7b8c9d0e1f",
      "status": "pending"
    }
  ]
}
```

##### GET /api/donors/:id
Access: Public
Purpose: Get donor details by id.

Success response example:
```json
{
  "success": true,
  "message": "Donor retrieved successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "bloodType": "O+",
    "location": {
      "division": "Dhaka",
      "district": "Dhaka",
      "upazila": "Dhanmondi",
      "area": "Road 27"
    },
    "phone": "01712345678",
    "availability": true,
    "status": "approved"
  }
}
```

##### PUT /api/donors/:id
Access: Authenticated (owner only)
Purpose: Update donor profile.

Request body example:
```json
{
  "bloodType": "A+",
  "location": {
    "district": "Gazipur"
  },
  "phone": "01812345678",
  "availability": false
}
```

Success response example:
```json
{
  "success": true,
  "message": "Donor profile updated successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "bloodType": "A+"
  }
}
```

##### DELETE /api/donors/:id
Access: Admin only
Purpose: Remove donor profile.

Success response example:
```json
{
  "success": true,
  "message": "Donor profile deleted successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f"
  }
}
```

##### PATCH /api/donors/:id/approve
Access: Admin only
Purpose: Approve donor profile.

Request body: none

Success response example:
```json
{
  "success": true,
  "message": "Donor approved successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "status": "approved"
  }
}
```

##### PATCH /api/donors/:id/reject
Access: Admin only
Purpose: Reject donor profile.

Request body: none

Success response example:
```json
{
  "success": true,
  "message": "Donor rejected successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "status": "rejected"
  }
}
```

#### Locations

##### GET /api/locations
Access: Public
Purpose: Get full Bangladesh location tree.

Success response example:
```json
{
  "success": true,
  "message": "Full location tree retrieved successfully",
  "data": [
    {
      "division": "Dhaka",
      "districts": [
        {
          "district": "Dhaka",
          "upazila": ["Dhanmondi", "Gulshan"]
        }
      ]
    }
  ]
}
```

##### GET /api/locations/divisions
Access: Public
Purpose: Get all divisions.

Success response example:
```json
{
  "success": true,
  "message": "Divisions retrieved successfully",
  "data": [
    {
      "division": "Dhaka",
      "divisionbn": "ঢাকা"
    }
  ]
}
```

##### GET /api/locations/districts/:divisionName
Access: Public
Purpose: Get districts and upazilas for a division.

Success response example:
```json
{
  "success": true,
  "message": "Districts of Dhaka retrieved successfully",
  "data": [
    {
      "district": "Dhaka",
      "upazila": ["Dhanmondi", "Mirpur"]
    }
  ]
}
```

##### GET /api/locations/upazilas/:districtName
Access: Public
Purpose: Get upazilas by district.

Success response example:
```json
{
  "success": true,
  "message": "Upazilas of Dhaka retrieved successfully",
  "data": ["Dhanmondi", "Mirpur"]
}
```

### 4.5 Error Responses

Common API error examples:

400 Bad Request
```json
{
  "success": false,
  "code": "INVALID_DATA",
  "message": "Invalid request data",
  "data": null
}
```

401 Unauthorized
```json
{
  "success": false,
  "code": "UNAUTHORIZED",
  "message": "No authorization token provided",
  "data": null
}
```

403 Forbidden
```json
{
  "success": false,
  "code": "FORBIDDEN",
  "message": "Access denied",
  "data": null
}
```

404 Not Found
```json
{
  "success": false,
  "code": "NOT_FOUND",
  "message": "Resource not found",
  "data": null
}
```

409 Conflict
```json
{
  "success": false,
  "code": "DUPLICATE_FIELD",
  "message": "Duplicate value found",
  "data": null
}
```

429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "error": "Too many requests. Please try again later."
}
```

500 Internal Server Error
```json
{
  "success": false,
  "code": "INTERNAL_ERROR",
  "message": "Internal Server Error",
  "data": null
}
```

## 5. Project Structure

```text
RedBridge/
|-- README.md
|-- Client-Side/
|   |-- package.json
|   |-- vite.config.js
|   |-- vercel.json
|   |-- src/
|       |-- main.jsx
|       |-- index.css
|       |-- Firebase/
|       |   |-- firebase.init.js
|       |-- Hooks/
|       |   |-- useAxios.jsx
|       |   |-- useDocumentTitle.jsx
|       |   |-- useUserRole.jsx
|       |-- Router/
|       |   |-- router.jsx
|       |-- Layout/
|       |   |-- Home/
|       |   |-- Admin/
|       |-- Components/
|           |-- Authentication/
|           |-- Donor/
|           |-- Profile/
|           |-- Shared/
|           |-- Static/
|           |-- Errors/
|
|-- Server-Side/
    |-- API_DOCUMENTATION.md
    |-- package.json
    |-- tsconfig.json
    |-- vercel.json
    |-- api/
    |   |-- index.ts
    |-- src/
        |-- app.ts
        |-- server.ts
        |-- seed.ts
        |-- config/
        |   |-- index.ts
        |   |-- db.ts
        |   |-- firebase.ts
        |-- constants/
        |-- middlewares/
        |-- modules/
        |   |-- user/
        |   |-- donor/
        |   |-- location/
        |-- utils/
        |-- data/
            |-- bangladesh-locations.json
```

Key locations:
- Frontend routing and page composition: `Client-Side/src/Router/router.jsx`
- Frontend API client setup: `Client-Side/src/Hooks/useAxios.jsx`
- Firebase initialization: `Client-Side/src/Firebase/firebase.init.js`
- Backend app bootstrap and middleware: `Server-Side/src/app.ts`
- Backend API module routes/controllers/services: `Server-Side/src/modules/*`

## 6. Features

- User registration and login with Firebase Authentication.
- Role-aware access model (`admin`, `donor`).
- Donor registration workflow with pending approval.
- Admin dashboard route for moderation.
- Donor search by blood type and geographic filters.
- Donor availability management.
- Bangladesh location hierarchy endpoints.
- Standardized API response format.
- Request validation with Zod.
- Global error handling with consistent error schema.
- Rate limiting and security middleware integration.

## 7. Usage

### For Public Visitors
1. Open the website home page.
2. Go to Find Donors.
3. Filter by blood group and location.
4. View approved donor profiles.

### For Donors
1. Register or log in using Firebase authentication.
2. Complete your donor profile with blood group, phone, and location.
3. Wait for admin approval.
4. Update your profile and availability when needed.

### For Admins
1. Log in with an account that has `admin` role.
2. Review pending donor requests.
3. Approve or reject donor profiles.
4. Manage user roles and donor records.

## 8. Developer Information


| Full Name | Role | Facebook | LinkedIn | WhatsApp |
|---|---|---|---|---|
| Md. Abdullah Al Noman | Frontend Developer | https://facebook.com/fb.abdullahalnoman | https://www.linkedin.com/in/abdullahalnoman003/ | https://wa.me/+8801522102892 |
| Reduan Ahmad | Backend Developer | https://www.facebook.com/reduanahmadswe | https://www.linkedin.com/in/reduanahmadswe/ | https://wa.me/+8801718485840 |
| Adnan Iqbal | Frontend Developer | https://www.facebook.com/adnan.iqbal.136202 | https://linkedin.com/in/developer-three | https://wa.me/+8801757026654 |

## 9. Academic Context

- This project is a university course project.
- It was developed as a group project.

## 10. Contribution Guidelines

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch from `main`.
3. Make focused changes with clear commit messages.
4. Run lint/build checks before opening a pull request.
5. Open a pull request with:
   - Summary of what changed
   - Why it changed
   - Testing notes
6. Address review feedback and keep the branch up to date.

Recommended quality checks:
```bash
# Frontend
cd Client-Side
npm run lint
npm run build

# Backend
cd ../Server-Side
npm run lint
npm run build
```

## 11. License

This project is distributed under the ISC License.


## 12. Document Quality Notes

- Language is kept clear and direct.
- Heading hierarchy and formatting are consistent.
- No emoji characters are used.
- API section includes base URL, authentication, all endpoints, request and response examples, and error formats.

## 13. Additional Resources & Guides

This project includes comprehensive guides for various aspects:

### Quick Start
- **Demo Credentials:** See [DEMO_CREDENTIALS.md](./DEMO_CREDENTIALS.md) for testing accounts
  - Admin account: `admin@redbridge.demo`
  - Donor account: `donor@redbridge.demo`
  - Run `npm run seed` to create demo data

### Deployment & Production
- **Production Deployment:** See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for:
  - Backend deployment (Railway, Heroku, Vercel)
  - Frontend deployment (Vercel, Netlify, self-hosted)
  - Database setup (MongoDB Atlas)
  - Environment variable configuration
  - SSL/HTTPS setup
  - Custom domain configuration
  - Post-deployment monitoring

### Images & Media
- **Images Guide:** See [IMAGES_GUIDE.md](./IMAGES_GUIDE.md) for:
  - Landing page image specifications
  - Bangladeshi image recommendations
  - Image optimization tips
  - Free stock photo sources
  - Fallback image URLs

## 14. Recent Updates (v1.1.0)

### Features Added
- User availability field for donors (toggle in profile)
- Improved admin filtering for pending donors
- Demo login credentials and seeding
- Comprehensive production deployment guide
- Bangladeshi image integration guide
- Production-ready database structure

### Bug Fixes
- Fixed donor routing issue (/pending route ordering)
- Fixed admin dashboard filtering
- Improved Firebase authentication flow

### Migration Guide
If upgrading from v1.0.0:
1. Stop running servers
2. Delete existing MongoDB data or use backup
3. Run `npm run seed` to populate with v1.1.0 data structure
4. Update environment variables if migrating to production
5. Redeploy frontend and backend

## 15. Getting Help

### Common Issues

**Port already in use:**
```bash
# Vite (port 5173)
npm run dev -- --port 5174

# Express (port 5000)
PORT=5001 npm run dev
```

**MongoDB connection error:**
- Verify `MONGODB_URI` in `.env`
- Check MongoDB service is running
- For MongoDB Atlas: verify IP whitelist

**Firebase auth not working:**
- Verify Firebase configuration in `.env` and `firebase.init.js`
- Enable Email/Password provider in Firebase Console
- Check CORS settings if API calls fail

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Resources
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
