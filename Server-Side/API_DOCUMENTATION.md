# RedBridge API Documentation

> Blood Donation Finder — Backend API

**Base URL:** `/api`

**Authentication:** Firebase ID Token via `Authorization: Bearer <token>` header

**User Roles:** `admin` | `donor`

---

## Table of Contents

- [Health Check](#health-check)
- [Users](#users)
- [Donors](#donors)
- [Locations](#locations)
- [Error Responses](#error-responses)
- [Application Flow](#application-flow)

---

## Health Check

### `GET /health`

> Public — No authentication required

**Response:**

```json
{
  "success": true,
  "message": "Blood Donation Finder API is running",
  "data": {
    "timestamp": "2026-03-04T12:00:00.000Z",
    "uptime": 1234.56
  }
}
```

---

## Users

### `POST /api/users` — Register User

> Public — Called after Firebase authentication

Creates a new user in the database.

**Request Body:**

| Field | Type   | Required | Description                           |
| ----- | ------ | -------- | ------------------------------------- |
| name  | string | Yes      | User's full name (2-100 chars)        |
| email | string | Yes      | Valid email address (unique)          |
| role  | string | No       | `admin` or `donor` (default: `donor`) |

**Example Request:**

```json
{
  "name": "Rahim Uddin",
  "email": "rahim@example.com"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "role": "donor",
    "createdAt": "2026-03-04T12:00:00.000Z"
  }
}
```

**Error (409):** User with this email already exists.

---

### `GET /api/users` — Get All Users

> Admin only — Requires Firebase token + `admin` role

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "660a1b2c3d4e5f6a7b8c9d0e",
      "name": "Rahim Uddin",
      "email": "rahim@example.com",
      "role": "donor",
      "createdAt": "2026-03-04T12:00:00.000Z"
    }
  ]
}
```

---

### `PATCH /api/users/:id/role` — Update User Role

> Admin only — Requires Firebase token + `admin` role

**URL Parameters:**

| Param | Type     | Description          |
| ----- | -------- | -------------------- |
| id    | ObjectId | User's MongoDB `_id` |

**Request Body:**

| Field | Type   | Required | Description        |
| ----- | ------ | -------- | ------------------ |
| role  | string | Yes      | `admin` or `donor` |

**Example Request:**

```json
{
  "role": "admin"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "role": "admin",
    "createdAt": "2026-03-04T12:00:00.000Z"
  }
}
```

**Error (400):** Invalid role.
**Error (404):** User not found.

---

## Donors

### `POST /api/donors` — Create Donor Profile

> Authenticated — Requires Firebase token

A logged-in user submits a donor form. The profile is created with `status: "pending"` and awaits admin approval.

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**Request Body:**

| Field             | Type    | Required | Description                                        |
| ----------------- | ------- | -------- | -------------------------------------------------- |
| bloodType         | string  | Yes      | `A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-` |
| location.division | string  | Yes      | Division name                                      |
| location.district | string  | Yes      | District name                                      |
| location.upazila  | string  | Yes      | Upazila name                                       |
| location.area     | string  | No       | Specific area (default: `""`)                      |
| phone             | string  | Yes      | Bangladeshi phone number (e.g., `01712345678`)     |
| availability      | boolean | No       | Whether currently available (default: `true`)      |

**Example Request:**

```json
{
  "bloodType": "O+",
  "location": {
    "division": "Dhaka",
    "district": "Dhaka",
    "upazila": "Dhanmondi",
    "area": "Road 27"
  },
  "phone": "01712345678"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Donor profile created successfully. Awaiting admin approval.",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "userId": {
      "_id": "660a1b2c3d4e5f6a7b8c9d0e",
      "name": "Rahim Uddin",
      "email": "rahim@example.com",
      "role": "donor"
    },
    "bloodType": "O+",
    "location": {
      "division": "Dhaka",
      "district": "Dhaka",
      "upazila": "Dhanmondi",
      "area": "Road 27"
    },
    "phone": "01712345678",
    "availability": true,
    "status": "pending",
    "createdAt": "2026-03-04T12:00:00.000Z",
    "updatedAt": "2026-03-04T12:00:00.000Z"
  }
}
```

**Error (409):** Donor profile already exists for this user.

---

### `GET /api/donors` — Search Donors

> Public — No authentication required

Returns only **approved** and **available** donors. Supports filtering by query parameters.

**Query Parameters:**

| Param     | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| bloodType | string | Filter by blood type (e.g., `O+`)     |
| division  | string | Filter by division (case-insensitive) |
| district  | string | Filter by district (case-insensitive) |
| upazila   | string | Filter by upazila (case-insensitive)  |

**Example:** `GET /api/donors?bloodType=O+&district=Dhaka`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Donors retrieved successfully",
  "data": [
    {
      "_id": "660b2c3d4e5f6a7b8c9d0e1f",
      "userId": {
        "_id": "660a1b2c3d4e5f6a7b8c9d0e",
        "name": "Rahim Uddin",
        "email": "rahim@example.com",
        "role": "donor"
      },
      "bloodType": "O+",
      "location": {
        "division": "Dhaka",
        "district": "Dhaka",
        "upazila": "Dhanmondi",
        "area": "Road 27"
      },
      "phone": "01712345678",
      "availability": true,
      "status": "approved",
      "createdAt": "2026-03-04T12:00:00.000Z",
      "updatedAt": "2026-03-04T12:00:00.000Z"
    }
  ]
}
```

---

### `GET /api/donors/:id` — Get Donor by ID

> Public — No authentication required

**URL Parameters:**

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | ObjectId | Donor's MongoDB `_id` |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Donor retrieved successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "userId": { ... },
    "bloodType": "O+",
    "location": { ... },
    "phone": "01712345678",
    "availability": true,
    "status": "approved",
    "createdAt": "2026-03-04T12:00:00.000Z",
    "updatedAt": "2026-03-04T12:00:00.000Z"
  }
}
```

**Error (404):** Donor not found.

---

### `PUT /api/donors/:id` — Update Donor Profile

> Authenticated — Owner only (the donor who created the profile)

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**URL Parameters:**

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | ObjectId | Donor's MongoDB `_id` |

**Request Body (all fields optional):**

| Field             | Type    | Description                                        |
| ----------------- | ------- | -------------------------------------------------- |
| bloodType         | string  | `A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-` |
| location.division | string  | Division name                                      |
| location.district | string  | District name                                      |
| location.upazila  | string  | Upazila name                                       |
| location.area     | string  | Specific area                                      |
| phone             | string  | Bangladeshi phone number                           |
| availability      | boolean | Whether currently available to donate               |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Donor profile updated successfully",
  "data": { ... }
}
```

**Error (403):** You can only update your own donor profile.
**Error (404):** Donor not found.

---

### `DELETE /api/donors/:id` — Delete Donor

> Admin only — Requires Firebase token + `admin` role

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**URL Parameters:**

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | ObjectId | Donor's MongoDB `_id` |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Donor profile deleted successfully",
  "data": { ... }
}
```

**Error (404):** Donor not found.

---

### `PATCH /api/donors/:id/approve` — Approve Donor

> Admin only — Requires Firebase token + `admin` role

Sets the donor's status to `approved`, making them visible in public search results.

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**URL Parameters:**

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | ObjectId | Donor's MongoDB `_id` |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Donor approved successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "status": "approved",
    ...
  }
}
```

**Error (404):** Donor not found.

---

### `PATCH /api/donors/:id/reject` — Reject Donor

> Admin only — Requires Firebase token + `admin` role

Sets the donor's status to `rejected`.

**Headers:**

```
Authorization: Bearer <firebase_id_token>
```

**URL Parameters:**

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | ObjectId | Donor's MongoDB `_id` |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Donor rejected successfully",
  "data": {
    "_id": "660b2c3d4e5f6a7b8c9d0e1f",
    "status": "rejected",
    ...
  }
}
```

**Error (404):** Donor not found.

---

## Locations

All location endpoints are **public** and fetch data from the [BD APIs](https://bdapis.com/api/v1.2) external service.

### `GET /api/locations` — Full Location Tree

> Public — No authentication required

Returns all divisions with their districts and upazilas nested.

**Success Response (200):**

```json
{
  "success": true,
  "message": "Full location tree retrieved successfully",
  "data": [
    {
      "division": "Dhaka",
      "divisionbn": "ঢাকা",
      "coordinates": "23.8103, 90.4125",
      "districts": [
        {
          "district": "Dhaka",
          "coordinates": "23.7115, 90.4113",
          "upazila": ["Dhanmondi", "Gulshan", "Mirpur"]
        }
      ]
    }
  ]
}
```

---

### `GET /api/locations/divisions` — Get All Divisions

> Public — No authentication required

Returns all 8 divisions of Bangladesh.

**Success Response (200):**

```json
{
  "success": true,
  "message": "Divisions retrieved successfully",
  "data": [
    {
      "division": "Dhaka",
      "divisionbn": "ঢাকা",
      "coordinates": "23.8103, 90.4125"
    }
  ]
}
```

---

### `GET /api/locations/districts/:divisionName` — Get Districts by Division

> Public — No authentication required

**URL Parameters:**

| Param        | Type   | Description                   |
| ------------ | ------ | ----------------------------- |
| divisionName | string | Division name (e.g., `Dhaka`) |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Districts of Dhaka retrieved successfully",
  "data": [
    {
      "district": "Dhaka",
      "coordinates": "23.7115, 90.4113",
      "upazila": ["Dhanmondi", "Gulshan", "Mirpur"]
    }
  ]
}
```

---

### `GET /api/locations/upazilas/:districtName` — Get Upazilas by District

> Public — No authentication required

**URL Parameters:**

| Param        | Type   | Description                   |
| ------------ | ------ | ----------------------------- |
| districtName | string | District name (e.g., `Dhaka`) |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Upazilas of Dhaka retrieved successfully",
  "data": ["Dhanmondi", "Gulshan", "Mirpur"]
}
```

---

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

### Common Error Codes

| Code | Description                                              |
| ---- | -------------------------------------------------------- |
| 400  | Bad request — invalid input or missing required fields   |
| 401  | Unauthorized — missing or invalid Firebase token         |
| 403  | Forbidden — insufficient role permissions                |
| 404  | Not found — resource or route does not exist             |
| 409  | Conflict — duplicate resource (e.g., email already used) |
| 429  | Too many requests — rate limit exceeded (100 req/15 min) |
| 500  | Internal server error                                    |

---

## Application Flow

```
Public User (no login required)
  ├── Browse approved donors ──── GET /api/donors
  ├── View donor details ──────── GET /api/donors/:id
  └── Browse locations ─────────── GET /api/locations/*

Logged-in User (Firebase auth)
  ├── Register in database ────── POST /api/users
  ├── Submit donor form ────────── POST /api/donors → status: "pending"
  └── Update own profile ──────── PUT /api/donors/:id

Admin (Firebase auth + admin role)
  ├── View all users ──────────── GET /api/users
  ├── Update user roles ────────── PATCH /api/users/:id/role
  ├── Approve donor ───────────── PATCH /api/donors/:id/approve
  ├── Reject donor ────────────── PATCH /api/donors/:id/reject
  └── Delete donor ────────────── DELETE /api/donors/:id
```
