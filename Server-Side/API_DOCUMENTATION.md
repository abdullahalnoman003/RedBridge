# 🩸 Blood Donation Finder API Documentation (Modern Postman Guide)

> **Base URL:** `http://localhost:5000`  
> **API Prefix:** `/api`  
> **Full Base:** `http://localhost:5000/api`

---

## 1) Quick Start

### Tech Stack (Backend)
- Node.js + Express + TypeScript (strict mode)
- MongoDB + Mongoose
- Firebase Admin SDK (JWT verification)
- Security: Helmet, CORS, Rate Limit

### Standard Response Format

**Success**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error**
```json
{
  "success": false,
  "message": "Error message",
  "error": "error details"
}
```

### Postman Suggested Variables
| Variable | Example |
|---|---|
| `baseUrl` | `http://localhost:5000/api` |
| `adminToken` | `eyJhbGciOi...` |
| `donorToken` | `eyJhbGciOi...` |
| `requesterToken` | `eyJhbGciOi...` |
| `adminUserId` | `65f1a2b3c4d5e6f7a8b9c0d1` |
| `donorId` | `65f2b3c4d5e6f7a8b9c0d1e2` |
| `requestId` | `65f3c4d5e6f7a8b9c0d1e2f3` |

---

## 2) 🔐 Authentication & Authorization

এই project এ **দুইটা auth mode** আছে:
- **Firebase mode** 
- **Manual mode** (email + password set/login)

### 2.1 Login (Firebase REST API)
```http
POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_WEB_API_KEY
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "123456",
  "returnSecureToken": true
}
```

**Response থেকে `idToken` নাও**, তারপর protected API-তে Bearer token হিসেবে পাঠাও:

```http
Authorization: Bearer <Firebase_ID_Token>
```

### 2.2 Manual Login (Backend API)
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Success (200)**
```json
{
  "success": true,
  "message": "Manual login successful",
  "data": {
    "token": "<Local_JWT_Token>",
    "user": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Admin Reduan",
      "email": "admin@gmail.com",
      "role": "admin"
    }
  }
}
```

### 2.3 Password Set/Update (Authenticated User)
```http
PATCH /api/users/set-password
Authorization: Bearer <Firebase_or_Local_Token>
Content-Type: application/json

{
  "password": "123456"
}
```

### 2.4 Backend কী validate করে
- Authorization header থেকে Bearer token extract করে
- প্রথমে Firebase token verify করার চেষ্টা করে
- Firebase match না হলে local JWT verify করে
- Decoded email দিয়ে DB থেকে user load করে `req.user` attach করে
- Role middleware (`admin` / `donor` / `requester`) enforce করে

### 2.5 Logout
- Backend এ আলাদা `/logout` endpoint নাই
- Firebase client side sign out করতে হবে
- Local token remove করতে হবে (Postman/Frontend storage থেকে)
- Token invalid/expired হলে protected API `401` দিবে

---

## 3) 👣 Step-by-Step User Flow (Login → Logout)

## Step 0 — Token নাও (Firebase বা Manual)
- **Firebase:** Firebase login করে `idToken` নাও
- **Manual:** `POST /api/users/login` call করে `token` নাও
- Postman Authorization tab এ `Bearer <token>` set করো

---

## Step 1 — Create Admin User (First-time Setup)

### `POST /users`
- **Auth:** Public
- **URL:** `{{baseUrl}}/users`

**Body**
```json
{
  "name": "Admin Reduan",
  "email": "admin@gmail.com",
  "role": "admin",
  "password": "123456"
}
```

> `password` optional। দিলে backend hash করে store করবে।

**Success (201)**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Admin Reduan",
    "email": "admin@gmail.com",
    "role": "admin",
    "createdAt": "2026-03-02T10:30:00.000Z"
  }
}
```

**Common Errors**
- `409` → User with this email already exists
- `400` → validation error

---

## Step 2 — Create Normal Users (Donor/Requester)

### `POST /users`
- **Auth:** Public
- **URL:** `{{baseUrl}}/users`

**Donor Body**
```json
{
  "name": "Rahim Uddin",
  "email": "rahim@gmail.com",
  "role": "donor",
  "password": "123456"
}
```

**Requester Body**
```json
{
  "name": "Karim Mia",
  "email": "karim@gmail.com",
  "role": "requester",
  "password": "123456"
}
```

> `role` না দিলে default `requester` হবে

---

## Step 2.1 — Set/Change Password (Optional)

### `PATCH /users/set-password`
- **Auth:** Bearer token required
- **Role:** Any authenticated user
- **URL:** `{{baseUrl}}/users/set-password`

**Body**
```json
{
  "password": "newPass123"
}
```

**Success (200)**
```json
{
  "success": true,
  "message": "Password set successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Admin Reduan",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

---

## Step 2.2 — Manual Login (Optional)

### `POST /users/login`
- **Auth:** Public
- **URL:** `{{baseUrl}}/users/login`

**Body**
```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Success (200)**
```json
{
  "success": true,
  "message": "Manual login successful",
  "data": {
    "token": "<Local_JWT_Token>",
    "user": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Admin Reduan",
      "email": "admin@gmail.com",
      "role": "admin"
    }
  }
}
```

---

## Step 3 — Admin Get All Users

### `GET /users`
- **Auth:** Bearer token required
- **Role:** `admin`
- **URL:** `{{baseUrl}}/users`

**Success (200)**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Admin Reduan",
      "email": "admin@gmail.com",
      "role": "admin",
      "createdAt": "2026-03-02T10:30:00.000Z"
    }
  ]
}
```

---

## Step 4 — Admin Update User Role

### `PATCH /users/:id/role`
- **Auth:** Bearer token required
- **Role:** `admin`
- **URL:** `{{baseUrl}}/users/{{adminUserId}}/role`

**Body**
```json
{
  "role": "requester"
}
```

**Allowed roles:** `admin`, `donor`, `requester`

**Success (200)**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Admin Reduan",
    "email": "admin@gmail.com",
    "role": "requester",
    "createdAt": "2026-03-02T10:30:00.000Z"
  }
}
```

**Errors**
- `400` invalid ObjectId / invalid role
- `404` user not found
- `403` not admin

---

## Step 5 — Create Donor Profile

### `POST /donors`
- **Auth:** Bearer token required
- **Role:** any authenticated user
- **URL:** `{{baseUrl}}/donors`

**Body**
```json
{
  "bloodType": "A+",
  "location": {
    "division": "Dhaka",
    "district": "Dhaka",
    "upazila": "Savar",
    "area": "Ashulia Bus Stand"
  },
  "phone": "01712345678",
  "availability": true
}
```

> `userId` body তে পাঠাতে হবে না। backend `req.user._id` থেকে set করে।

**Success (201)**
```json
{
  "success": true,
  "message": "Donor profile created successfully. Awaiting admin approval.",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "userId": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Rahim Uddin",
      "email": "rahim@gmail.com",
      "role": "donor"
    },
    "bloodType": "A+",
    "location": {
      "division": "Dhaka",
      "district": "Dhaka",
      "upazila": "Savar",
      "area": "Ashulia Bus Stand"
    },
    "phone": "01712345678",
    "availability": true,
    "status": "pending",
    "createdAt": "2026-03-02T11:00:00.000Z",
    "updatedAt": "2026-03-02T11:00:00.000Z"
  }
}
```

---

## Step 6 — Admin Approve/Reject Donor

### 6.1 `PATCH /donors/:id/approve`
- **Auth:** Bearer token
- **Role:** `admin`
- **Body:** none
- **URL:** `{{baseUrl}}/donors/{{donorId}}/approve`

**Success (200)**
```json
{
  "success": true,
  "message": "Donor approved successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "status": "approved"
  }
}
```

### 6.2 `PATCH /donors/:id/reject`
- **Auth:** Bearer token
- **Role:** `admin`
- **Body:** none
- **URL:** `{{baseUrl}}/donors/{{donorId}}/reject`

**Success (200)**
```json
{
  "success": true,
  "message": "Donor rejected successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "status": "rejected"
  }
}
```

---

## Step 7 — Public Donor Search

### `GET /donors`
- **Auth:** Public
- **URL:** `{{baseUrl}}/donors`
- **Query params (optional):** `bloodType`, `division`, `district`, `upazila`

**Examples**
- `{{baseUrl}}/donors?bloodType=A+`
- `{{baseUrl}}/donors?district=Dhaka&upazila=Savar`

> এই endpoint only `status=approved` + `availability=true` donors return করে।

**Success (200)**
```json
{
  "success": true,
  "message": "Donors retrieved successfully",
  "data": [
    {
      "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
      "bloodType": "A+",
      "availability": true,
      "status": "approved"
    }
  ]
}
```

---

## Step 8 — Public Single Donor View

### `GET /donors/:id`
- **Auth:** Public
- **URL:** `{{baseUrl}}/donors/{{donorId}}`

**Success (200)**
```json
{
  "success": true,
  "message": "Donor retrieved successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "bloodType": "A+",
    "status": "approved"
  }
}
```

---

## Step 9 — Donor Update Own Profile

### `PUT /donors/:id`
- **Auth:** Bearer token
- **Role:** own profile only
- **URL:** `{{baseUrl}}/donors/{{donorId}}`

**Body (partial update style accepted)**
```json
{
  "bloodType": "B+",
  "phone": "01812345678",
  "availability": false
}
```

**Alternative Body**
```json
{
  "location": {
    "division": "Chattogram",
    "district": "Chattogram",
    "upazila": "Hathazari",
    "area": "New Market"
  }
}
```

**Success (200)**
```json
{
  "success": true,
  "message": "Donor profile updated successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "bloodType": "B+",
    "availability": false
  }
}
```

**Errors**
- `403` You can only update your own donor profile

---

## Step 10 — Admin Delete Donor

### `DELETE /donors/:id`
- **Auth:** Bearer token
- **Role:** `admin`
- **URL:** `{{baseUrl}}/donors/{{donorId}}`
- **Body:** none

**Success (200)**
```json
{
  "success": true,
  "message": "Donor profile deleted successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2"
  }
}
```

---

## Step 11 — Create Blood Request

### `POST /requests`
- **Auth:** Bearer token
- **Role:** any authenticated user
- **URL:** `{{baseUrl}}/requests`

**Body**
```json
{
  "bloodType": "O+",
  "location": "Dhaka Medical College Hospital, Dhaka",
  "message": "Amader patient er jonno 2 bag O+ blood dorkar."
}
```

> `requesterId` backend auto set করে from token user.

**Success (201)**
```json
{
  "success": true,
  "message": "Blood request created successfully",
  "data": {
    "_id": "65f3c4d5e6f7a8b9c0d1e2f3",
    "requesterId": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d3",
      "name": "Karim Mia",
      "email": "karim@gmail.com",
      "role": "requester"
    },
    "bloodType": "O+",
    "location": "Dhaka Medical College Hospital, Dhaka",
    "message": "Amader patient er jonno 2 bag O+ blood dorkar.",
    "createdAt": "2026-03-02T14:00:00.000Z"
  }
}
```

---

## Step 12 — Admin Get All Blood Requests

### `GET /requests`
- **Auth:** Bearer token
- **Role:** `admin`
- **URL:** `{{baseUrl}}/requests`

**Success (200)**
```json
{
  "success": true,
  "message": "Blood requests retrieved successfully",
  "data": [
    {
      "_id": "65f3c4d5e6f7a8b9c0d1e2f3",
      "bloodType": "O+",
      "location": "Dhaka Medical College Hospital, Dhaka",
      "message": "Amader patient er jonno 2 bag O+ blood dorkar."
    }
  ]
}
```

---

## Step 13 — Admin Delete Blood Request

### `DELETE /requests/:id`
- **Auth:** Bearer token
- **Role:** `admin`
- **URL:** `{{baseUrl}}/requests/{{requestId}}`
- **Body:** none

**Success (200)**
```json
{
  "success": true,
  "message": "Blood request deleted successfully",
  "data": {
    "_id": "65f3c4d5e6f7a8b9c0d1e2f3"
  }
}
```

---

## Step 14 — Location APIs (Public)

### 14.1 `GET /locations` (full tree)
- **Auth:** Public
- **URL:** `{{baseUrl}}/locations`

**Success (200)**
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
          "upazilla": ["Savar", "Dhamrai"]
        }
      ]
    }
  ]
}
```

### 14.2 `GET /locations/divisions`
- **URL:** `{{baseUrl}}/locations/divisions`

**Success (200)**
```json
{
  "success": true,
  "message": "Divisions retrieved successfully",
  "data": [
    { "division": "Dhaka", "divisionbn": "ঢাকা", "coordinates": "23.8103, 90.4125" }
  ]
}
```

### 14.3 `GET /locations/districts/:divisionName`
- **URL:** `{{baseUrl}}/locations/districts/Dhaka`

**Success (200)**
```json
{
  "success": true,
  "message": "Districts of Dhaka retrieved successfully",
  "data": [
    {
      "district": "Gazipur",
      "coordinates": "24.0023, 90.4203",
      "upazilla": ["Gazipur Sadar", "Sreepur"]
    }
  ]
}
```

### 14.4 `GET /locations/upazilas/:districtName`
- **URL:** `{{baseUrl}}/locations/upazilas/Gazipur`

**Success (200)**
```json
{
  "success": true,
  "message": "Upazilas of Gazipur retrieved successfully",
  "data": [
    {
      "district": "Gazipur",
      "districtbn": "গাজীপুর",
      "coordinates": "24.0023, 90.4203",
      "upazilla": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"]
    }
  ]
}
```

---

## Step 15 — Health Check

### `GET /health`
- **Auth:** Public
- **URL:** `http://localhost:5000/health`

**Success (200)**
```json
{
  "success": true,
  "message": "Blood Donation Finder API is running",
  "data": {
    "timestamp": "2026-03-02T10:00:00.000Z",
    "uptime": 1234.56
  }
}
```

---

## Step 16 — Logout (Client Side)

Backend এ logout endpoint নেই। Logout flow:
1. Firebase client SDK দিয়ে signOut করো
2. Frontend/Postman থেকে stored token remove করো
3. পুরোনো token দিয়ে API hit করলে expiry হলে `401` আসবে

---

## 4) ✅ Complete API Quick Reference

| # | Method | Endpoint | Auth | Role | Body |
|---|---|---|---|---|---|
| 1 | `POST` | `/api/users` | ❌ | Public | `{ name, email, role?, password? }` |
| 2 | `POST` | `/api/users/login` | ❌ | Public | `{ email, password }` |
| 3 | `PATCH` | `/api/users/set-password` | ✅ | Auth user | `{ password }` |
| 4 | `GET` | `/api/users` | ✅ | Admin | None |
| 5 | `PATCH` | `/api/users/:id/role` | ✅ | Admin | `{ role }` |
| 6 | `POST` | `/api/donors` | ✅ | Auth user | `{ bloodType, location, phone, availability? }` |
| 7 | `GET` | `/api/donors` | ❌ | Public | Query params |
| 8 | `GET` | `/api/donors/:id` | ❌ | Public | None |
| 9 | `PUT` | `/api/donors/:id` | ✅ | Owner only | Partial donor fields |
| 10 | `DELETE` | `/api/donors/:id` | ✅ | Admin | None |
| 11 | `PATCH` | `/api/donors/:id/approve` | ✅ | Admin | None |
| 12 | `PATCH` | `/api/donors/:id/reject` | ✅ | Admin | None |
| 13 | `POST` | `/api/requests` | ✅ | Auth user | `{ bloodType, location, message }` |
| 14 | `GET` | `/api/requests` | ✅ | Admin | None |
| 15 | `DELETE` | `/api/requests/:id` | ✅ | Admin | None |
| 16 | `GET` | `/api/locations` | ❌ | Public | None |
| 17 | `GET` | `/api/locations/divisions` | ❌ | Public | None |
| 18 | `GET` | `/api/locations/districts/:divisionName` | ❌ | Public | None |
| 19 | `GET` | `/api/locations/upazilas/:districtName` | ❌ | Public | None |
| 20 | `GET` | `/health` | ❌ | Public | None |

---

## 5) ✅ Full Functionality Coverage (Project Capabilities)

## 🔐 Authentication & Authorization
- ✅ Firebase JWT token verification (backend side)
- ✅ Local JWT verification (manual login token)
- ✅ Authorization header থেকে Bearer token extract
- ✅ Decoded user email attach to `req.user`
- ✅ Role-based access control (`admin` / `donor` / `requester`)
- ✅ Unauthorized access prevention (`401` / `403`)

## 👤 User Management
- ✅ First login/initial sync এ user create (`POST /api/users`)
- ✅ Optional password set during user create
- ✅ Manual login with email/password (`POST /api/users/login`)
- ✅ Set/change password endpoint (`PATCH /api/users/set-password`)
- ✅ Email unique validation
- ✅ Admin can get all users
- ✅ Admin can update user role
- ✅ Role change support (`admin`, `donor`, `requester`)

## 🩸 Donor Management
- ✅ Donor profile create (default `status = pending`)
- ✅ Donor CRUD support
- ✅ Donor own profile update only
- ✅ Admin can delete donor
- ✅ Admin approve donor
- ✅ Admin reject donor
- ✅ Donor availability toggle
- ✅ Donor linked with User (`userId` reference)

## 🛠 Admin Approval Workflow
- ✅ Donor self registration → `pending`
- ✅ Admin approval required before public visibility
- ✅ Only approved donors shown in public search
- ✅ Rejected donors hidden from public results

## 🔍 Public Donor Search System
- ✅ Public route (no authentication)
- ✅ Filter by bloodType
- ✅ Filter by district/division/upazila
- ✅ Only show `status=approved` + `availability=true`
- ✅ Query-based dynamic filtering
- ✅ Single donor view endpoint

## 📝 Blood Request Management
- ✅ Create blood request
- ✅ Admin can view all requests
- ✅ Admin can delete request
- ✅ Request linked with `requesterId`

## 🗄 Database Features
- ✅ MongoDB with Mongoose
- ✅ Schema validation
- ✅ ObjectId reference relationships
- ✅ Timestamps (`createdAt`, `updatedAt` where applicable)
- ✅ Strict TypeScript interfaces

## 🧱 Architecture & Code Structure
- ✅ Modular structure (`user`, `donor`, `request`, `location`)
- ✅ MVC + Service Layer pattern
- ✅ Separate `model`, `interface`, `service`, `controller`, `route`, `module`
- ✅ Clean separation of concerns

## 🛡 Security Features
- ✅ Firebase Admin SDK verification
- ✅ Password hashing with bcrypt
- ✅ Local JWT token-based auth support
- ✅ CORS enabled
- ✅ Helmet security headers
- ✅ Rate limiting
- ✅ MongoDB ObjectId validation middleware
- ✅ Plain-text password never stored (only hashed)
- ✅ Environment variable configuration
- ✅ Global error handling middleware + custom `ApiError`

## 📦 API Design
- ✅ RESTful API structure
- ✅ Standardized response format
- ✅ Proper HTTP status codes
- ✅ Async/await based implementation
- ✅ Centralized error handling

## ⚙ Infrastructure & Setup
- ✅ TypeScript strict mode
- ✅ ES Module syntax
- ✅ dotenv config
- ✅ MongoDB connection setup
- ✅ Firebase Admin configuration
- ✅ Production-ready server setup
- ✅ Scalable folder structure

---

## 6) Common Error Reference

| Message | Code | Meaning |
|---|---:|---|
| `Access denied. No token provided.` | 401 | Bearer token missing |
| `Invalid or expired token.` | 401 | Token invalid/expired |
| `Invalid email or password` | 401 | Manual login credential mismatch |
| `Access denied. Required roles: admin` | 403 | Non-admin tried admin route |
| `User with this email already exists` | 409 | Duplicate user email |
| `Donor profile already exists for this user` | 409 | Same user tried duplicate donor profile |
| `Invalid id: ...` | 400 | Invalid MongoDB ObjectId |
| `Route not found` | 404 | Wrong endpoint |
| `Too many requests, please try again later.` | 429 | Rate limit exceeded |
| `User not found. Please register first.` | 404 | Token email exists in Firebase, not in DB |
| `Donor not found` | 404 | Invalid donor reference |
| `Blood request not found` | 404 | Invalid request reference |

---

## 7) Validation Notes

### Blood Type Allowed Values
`A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`

### Phone (BD)
- `01XXXXXXXXX`
- `+880XXXXXXXXXX`

### ObjectId
- অবশ্যই 24-char hex হতে হবে
- invalid id → `400`

---

## 8) Postman Execution Order (Recommended)

1. `POST /api/users` (admin + optional password)
2. `POST /api/users` (donor/requester + optional password)
3. `POST /api/users/login` (manual token) **or** Firebase login (idToken)
4. `PATCH /api/users/set-password` (optional, if password set/change needed)
5. `GET /api/users` (admin)
6. `PATCH /api/users/:id/role` (admin)
7. `POST /api/donors`
8. `PATCH /api/donors/:id/approve` (admin)
9. `GET /api/donors` (public search)
10. `PUT /api/donors/:id` (owner)
11. `POST /api/requests`
12. `GET /api/requests` (admin)
13. `DELETE /api/requests/:id` (admin)
14. `GET /api/locations/*`
15. `GET /health`
16. Logout: Firebase signOut / local token remove

---

Documentation updated for your current server implementation (`/api/users`, `/api/donors`, `/api/requests`, `/api/locations`, `/health`).
