# 🩸 Blood Donation Finder — Full API Documentation (Postman Guide)

> **Base URL:** `http://localhost:5000`
> **API Prefix:** `/api`

---

---

# 📌 PROTHOME JANTE HOBE — Authentication System

Ei project e **Firebase Authentication** use kora hoyeche. Mane backend e kono password store hoy na. Firebase handle kore login/signup.

### Kivabe kaj kore:
1. Frontend e Firebase diye **signup/login** koro (email + password)
2. Login er por Firebase ekta **ID Token** dey
3. Oi token ta backend er **every protected API** te pathate hoy header e

### Postman e token set korar niyom:
```
Tab: Authorization
Type: Bearer Token
Token: <tomar Firebase ID Token paste koro ekhane>
```

**Ba manually header e:**
```
Key:   Authorization
Value: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Token na dile: `401 Unauthorized`
> ⚠️ Admin na hole admin API call korle: `403 Forbidden`

---

### 🔑 Firebase Token Kivabe Pabo (Testing er jonno)?

**Method 1 — Firebase REST API (Best for Postman):**
```
POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_WEB_API_KEY

Body (JSON):
{
  "email": "admin@gmail.com",
  "password": "123456",
  "returnSecureToken": true
}
```
Response e `idToken` field e token pabe — oi ta Postman e use korbe.

> **YOUR_WEB_API_KEY** pabe: Firebase Console → Project Settings → General → Web API Key

**Method 2 — Frontend theke (code diye):**
```javascript
import { getAuth } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;
const token = await user.getIdToken();
console.log(token); // Ei token ta copy koro Postman e use korar jonno
```

---

### 👥 Roles (3 dhoron er user):

| Role | Ki korte pare |
|------|---------------|
| `admin` | Shob kichu — user manage, donor approve/reject, request delete |
| `donor` | Nijer donor profile create/update |
| `requester` | Blood request create |

---

### 📦 Standard Response Format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "error details"
}
```

---

---

# ============================================
# 🚀 COMPLETE USER FLOW — Step by Step Postman
# ============================================

---

---

# STEP 1: ADMIN USER CREATE KORO

> Server e prothom e ekjon admin user create korte hobe. Tar por admin diye baki shob manage hobe.

---

## 📋 API: Create User (POST /api/users)

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/users` |
| **Auth** | ❌ Lagbe NA (Public) |

### Postman e kivabe korbe:

**Step 1:** Postman open koro → New Request create koro

**Step 2:** Method select koro: **POST**

**Step 3:** URL likho: `http://localhost:5000/api/users`

**Step 4:** Body tab e jao → **raw** select koro → Type **JSON** select koro

**Step 5:** Ei JSON body likho:

```json
{
  "name": "Admin Reduan",
  "email": "admin@gmail.com",
  "role": "admin"
}
```

**Step 6:** **Send** button click koro

### Request Body Fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ Yes | User er naam (min 2, max 100 character) |
| `email` | string | ✅ Yes | Firebase e je email diye signup koreche **SAME email** dite hobe |
| `role` | string | ❌ Optional | `"admin"` / `"donor"` / `"requester"` — na dile default `"requester"` |

> ⚠️ **IMPORTANT:** Email ta **Firebase Authentication e je email diye signup koreche shei SAME email** dite hobe. Na hole login korar por backend user khuje pabe na.

### ✅ Success Response (201 Created):
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

### ❌ Error Responses:
| Code | Response |
|------|----------|
| 409 | `{ "success": false, "message": "User with this email already exists" }` |
| 400 | `{ "success": false, "message": "name is required" }` |

---

---

# STEP 2: NORMAL USER (DONOR / REQUESTER) CREATE KORO

> Same API — shudhu role change hobe.

### Donor user create:
```
POST http://localhost:5000/api/users

Body (raw JSON):
{
  "name": "Rahim Uddin",
  "email": "rahim@gmail.com",
  "role": "donor"
}
```

### Requester user create:
```
POST http://localhost:5000/api/users

Body (raw JSON):
{
  "name": "Karim Mia",
  "email": "karim@gmail.com",
  "role": "requester"
}
```

### Role na dile by default requester hobe:
```json
{
  "name": "Default User",
  "email": "default@gmail.com"
}
```

---

---

# STEP 3: GET ALL USERS (Admin Only)

> Admin dekhte parbe database e koyta user ache ar karar ki role.

## 📋 API: Get All Users (GET /api/users)

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/users` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Shudhu `admin` |

### Postman e kivabe korbe:

**Step 1:** Method: **GET**

**Step 2:** URL: `http://localhost:5000/api/users`

**Step 3:** Authorization tab e jao:
- **Type:** `Bearer Token`
- **Token:** `<Admin user er Firebase ID Token paste koro>`

> 🔴 **Token kothai pabe?**
> Firebase REST API diye login koro:
> ```
> POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_WEB_API_KEY
>
> Body: { "email": "admin@gmail.com", "password": "123456", "returnSecureToken": true }
> ```
> Response er `idToken` field er value copy koro → Postman er Bearer Token e paste koro.

**Step 4:** Body te **kichui dite hobe na** — khali rakhbe

**Step 5:** **Send** click koro

### ✅ Success Response (200):
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
    },
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Rahim Uddin",
      "email": "rahim@gmail.com",
      "role": "donor",
      "createdAt": "2026-03-02T10:35:00.000Z"
    },
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d3",
      "name": "Karim Mia",
      "email": "karim@gmail.com",
      "role": "requester",
      "createdAt": "2026-03-02T10:40:00.000Z"
    }
  ]
}
```

### ❌ Error Responses:
| Code | Keno hoy |
|------|----------|
| 401 | Token daw ni ba expired token — `"Access denied. No token provided"` |
| 403 | Token decho kintu admin na — `"Access denied. Required roles: admin"` |

---

---

# STEP 4: UPDATE USER ROLE (Admin Only)

> Admin kono user er role change korte parbe — requester ke donor banano, donor ke admin banano etc.

## 📋 API: Update User Role (PATCH /api/users/:id/role)

| Item | Value |
|------|-------|
| **Method** | `PATCH` |
| **URL** | `http://localhost:5000/api/users/<USER_ID>/role` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Shudhu `admin` |

### Postman e kivabe korbe:

**Step 1:** Method: **PATCH**

**Step 2:** URL e user er `_id` boshao:
```
http://localhost:5000/api/users/65f1a2b3c4d5e6f7a8b9c0d2/role
```
> `:id` er jaygay oi user er `_id` dite hobe — **GET /api/users** theke peye cho.

**Step 3:** Authorization tab → Bearer Token → **Admin er token** paste koro

**Step 4:** Body tab → raw → JSON:
```json
{
  "role": "admin"
}
```

**Step 5:** **Send** click koro

### Request Body:
| Field | Type | Required | Options |
|-------|------|----------|---------|
| `role` | string | ✅ Yes | `"admin"` / `"donor"` / `"requester"` |

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Rahim Uddin",
    "email": "rahim@gmail.com",
    "role": "admin",
    "createdAt": "2026-03-02T10:35:00.000Z"
  }
}
```

### ❌ Error Responses:
| Code | Keno hoy |
|------|----------|
| 400 | Invalid ObjectId (id ta thik na) |
| 404 | User not found |
| 401 | Token nai |
| 403 | Admin na |

---

---

# STEP 5: DONOR PROFILE CREATE KORO

> User create hoye geche. Ekhon oi user nijer donor profile create korbe — blood type, location, phone diye.

## 📋 API: Create Donor Profile (POST /api/donors)

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/donors` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Jei kono logged-in user |

### Postman e kivabe korbe:

**Step 1:** Method: **POST**

**Step 2:** URL: `http://localhost:5000/api/donors`

**Step 3:** Authorization tab → **Bearer Token** → **Donor user (Rahim) er Firebase token** paste koro

> ⚠️ Ekhane DONOR user er token dite hobe. Je user donor hote chay tar token.

**Step 4:** Body tab → raw → JSON:
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

**Step 5:** **Send** click koro

### Request Body Fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bloodType` | string | ✅ Yes | `"A+"` `"A-"` `"B+"` `"B-"` `"O+"` `"O-"` `"AB+"` `"AB-"` |
| `location.division` | string | ✅ Yes | Division naam (Location API theke pabe) |
| `location.district` | string | ✅ Yes | District naam |
| `location.upazila` | string | ✅ Yes | Upazila naam |
| `location.area` | string | ❌ Optional | Specific area ba address |
| `phone` | string | ✅ Yes | BD phone number — `01XXXXXXXXX` format |
| `availability` | boolean | ❌ Optional | Donor available kina (default: `true`) |

> 📌 **userId pathate hobe NA!** Backend automatically logged-in user er ID set kore dey.
> 📌 **Status default `"pending"` thake.** Admin approve korle public search e dekhabe.

### ✅ Success Response (201 Created):
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

### ❌ Error Responses:
| Code | Keno hoy |
|------|----------|
| 401 | Token nai — login koro age |
| 409 | Ei user er already donor profile ache |
| 400 | bloodType missing / phone number invalid |

---

---

# STEP 6: ADMIN DONOR APPROVE KORE

> Donor profile create korar por status `"pending"` thake. Admin approve korle public search e dekhabe.

## 📋 API: Approve Donor (PATCH /api/donors/:id/approve)

| Item | Value |
|------|-------|
| **Method** | `PATCH` |
| **URL** | `http://localhost:5000/api/donors/<DONOR_ID>/approve` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Shudhu `admin` |

### Postman e kivabe korbe:

**Step 1:** Method: **PATCH**

**Step 2:** URL e donor er `_id` boshao:
```
http://localhost:5000/api/donors/65f2b3c4d5e6f7a8b9c0d1e2/approve
```

**Step 3:** Authorization tab → Bearer Token → **ADMIN** er token paste koro

**Step 4:** Body te **KICHUI dite hobe NA** — khali rakhbe

**Step 5:** **Send** click koro

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Donor approved successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "userId": "65f1a2b3c4d5e6f7a8b9c0d2",
    "bloodType": "A+",
    "location": {
      "division": "Dhaka",
      "district": "Dhaka",
      "upazila": "Savar",
      "area": "Ashulia Bus Stand"
    },
    "phone": "01712345678",
    "availability": true,
    "status": "approved",
    "createdAt": "2026-03-02T11:00:00.000Z",
    "updatedAt": "2026-03-02T11:15:00.000Z"
  }
}
```

---

## 📋 API: Reject Donor (PATCH /api/donors/:id/reject)

> Same process — shudhu URL e `/reject` hobe `/approve` er bodole:

| Item | Value |
|------|-------|
| **Method** | `PATCH` |
| **URL** | `http://localhost:5000/api/donors/<DONOR_ID>/reject` |
| **Auth** | ✅ Bearer Token (Admin) |
| **Body** | ❌ Lagbe NA |

```
PATCH http://localhost:5000/api/donors/65f2b3c4d5e6f7a8b9c0d1e2/reject
```

### ✅ Response:
```json
{
  "success": true,
  "message": "Donor rejected successfully",
  "data": { "...status: rejected..." }
}
```

---

---

# STEP 7: DONOR SEARCH KORO (Public — Token lagbe NA)

> Je keu blood donor search korte parbe — bloodType, division, district, upazila diye filter diye.

## 📋 API: Search Donors (GET /api/donors)

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/donors` |
| **Auth** | ❌ Lagbe NA (Public) |

### Postman e kivabe korbe:

**Step 1:** Method: **GET**

**Step 2:** URL likho. Query parameter diye filter korte parbe:

### 🔍 Search Examples:

| # | Ki search korte chao | Postman URL |
|---|---------------------|-------------|
| 1 | Shob approved donor | `http://localhost:5000/api/donors` |
| 2 | Shudhu A+ donor | `http://localhost:5000/api/donors?bloodType=A+` |
| 3 | Dhaka district e O+ donor | `http://localhost:5000/api/donors?bloodType=O+&district=Dhaka` |
| 4 | Rajshahi division e B+ donor | `http://localhost:5000/api/donors?bloodType=B+&division=Rajshahi` |
| 5 | Gazipur er Sreepur e | `http://localhost:5000/api/donors?district=Gazipur&upazila=Sreepur` |
| 6 | Full filter | `http://localhost:5000/api/donors?bloodType=A+&division=Dhaka&district=Dhaka&upazila=Savar` |

### Postman er Params Tab use koro (URL e manually na likhe):

```
Tab: Params

Key           | Value
------------- | -----
bloodType     | A+
district      | Dhaka
```

> Params tab e key-value dile Postman automatically URL e `?bloodType=A+&district=Dhaka` jog kore dibe.

### Query Parameters:

| Param | Type | Example | Description |
|-------|------|---------|-------------|
| `bloodType` | string | `A+` | Blood group diye filter |
| `division` | string | `Dhaka` | Division diye filter |
| `district` | string | `Gazipur` | District diye filter |
| `upazila` | string | `Savar` | Upazila diye filter |

> ℹ️ **IMPORTANT:** Ei API shudhu eider dekhabe:
> - `status = "approved"` (admin approved koreche)
> - `availability = true` (donor blood dite available)
>
> Pending/rejected donor **public search e ashbe NA**.

**Step 3:** Authorization → **No Auth** (kichui dite hobe na)

**Step 4:** Body khali rakhbe

**Step 5:** **Send** click koro

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Donors retrieved successfully",
  "data": [
    {
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
      "status": "approved",
      "createdAt": "2026-03-02T11:00:00.000Z",
      "updatedAt": "2026-03-02T11:15:00.000Z"
    }
  ]
}
```

---

---

# STEP 8: SINGLE DONOR DEKHO (Public)

## 📋 API: Get Donor by ID (GET /api/donors/:id)

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/donors/<DONOR_ID>` |
| **Auth** | ❌ Lagbe NA (Public) |

### Postman e kivabe korbe:

**Step 1:** Method: **GET**

**Step 2:** URL: `http://localhost:5000/api/donors/65f2b3c4d5e6f7a8b9c0d1e2`

**Step 3:** Auth nai, Body nai → Shudhu **Send** koro

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Donor retrieved successfully",
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
    "status": "approved"
  }
}
```

### ❌ Errors:
| Code | Keno |
|------|------|
| 400 | Invalid id (MongoDB ObjectId na) |
| 404 | Donor not found |

---

---

# STEP 9: DONOR NIJER PROFILE UPDATE KORE

> Donor nijei nijer profile update korte parbe. Kintu **onno donor er profile update korte parbe NA**.

## 📋 API: Update Donor Profile (PUT /api/donors/:id)

| Item | Value |
|------|-------|
| **Method** | `PUT` |
| **URL** | `http://localhost:5000/api/donors/<DONOR_ID>` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | **Nijer own profile** only |

### Postman e kivabe korbe:

**Step 1:** Method: **PUT**

**Step 2:** URL: `http://localhost:5000/api/donors/65f2b3c4d5e6f7a8b9c0d1e2`

**Step 3:** Authorization → Bearer Token → **Donor user (Rahim)** er token dew

> ⚠️ Admin er token dile kaj hobe NA — je user er profile, tar token lagbe.

**Step 4:** Body tab → raw → JSON (je fields change korte chao shudhu shegulo dew):

**Example 1 — Blood type ar phone change:**
```json
{
  "bloodType": "B+",
  "phone": "01812345678",
  "availability": false
}
```

**Example 2 — Shudhu location change:**
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

**Example 3 — Shudhu availability off:**
```json
{
  "availability": false
}
```

### Updatable Fields:
| Field | Type | Description |
|-------|------|-------------|
| `bloodType` | string | Notun blood type |
| `location` | object | Notun location |
| `phone` | string | Notun phone |
| `availability` | boolean | Available kina |

**Step 5:** **Send**

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Donor profile updated successfully",
  "data": {
    "_id": "65f2b3c4d5e6f7a8b9c0d1e2",
    "bloodType": "B+",
    "phone": "01812345678",
    "availability": false,
    "status": "approved"
  }
}
```

### ❌ Errors:
| Code | Keno |
|------|------|
| 401 | Token nai |
| 403 | "You can only update your own donor profile" |
| 404 | Donor not found |

---

---

# STEP 10: DONOR DELETE KORO (Admin Only)

## 📋 API: Delete Donor (DELETE /api/donors/:id)

| Item | Value |
|------|-------|
| **Method** | `DELETE` |
| **URL** | `http://localhost:5000/api/donors/<DONOR_ID>` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Shudhu `admin` |

### Postman e kivabe korbe:

**Step 1:** Method: **DELETE**

**Step 2:** URL: `http://localhost:5000/api/donors/65f2b3c4d5e6f7a8b9c0d1e2`

**Step 3:** Authorization → Bearer Token → **Admin** er token

**Step 4:** Body **khali** — kichui dite hobe na

**Step 5:** **Send**

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Donor profile deleted successfully",
  "data": { "...deleted donor object..." }
}
```

---

---

# STEP 11: BLOOD REQUEST CREATE KORO

> Karo blood dorkar hole ei API call korbe.

## 📋 API: Create Blood Request (POST /api/requests)

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:5000/api/requests` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Jei kono logged-in user |

### Postman e kivabe korbe:

**Step 1:** Method: **POST**

**Step 2:** URL: `http://localhost:5000/api/requests`

**Step 3:** Authorization → Bearer Token → Requester user (Karim) er token dew

**Step 4:** Body tab → raw → JSON:
```json
{
  "bloodType": "O+",
  "location": "Dhaka Medical College Hospital, Dhaka",
  "message": "Amader patient er jonno 2 bag O+ blood dorkar. Please jogajog korun."
}
```

### Request Body Fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bloodType` | string | ✅ Yes | Ki blood group dorkar — `"A+"` `"A-"` `"B+"` `"B-"` `"O+"` `"O-"` `"AB+"` `"AB-"` |
| `location` | string | ✅ Yes | Kothai blood dorkar — hospital name / address |
| `message` | string | ✅ Yes | Details message (max 500 character) |

> 📌 `requesterId` pathate hobe NA! Backend auto set kore.

**Step 5:** **Send**

### ✅ Success Response (201):
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

---

# STEP 12: GET ALL REQUESTS (Admin Only)

## 📋 API: Get All Requests (GET /api/requests)

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/requests` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Shudhu `admin` |

### Postman e kivabe korbe:

**Step 1:** Method: **GET**

**Step 2:** URL: `http://localhost:5000/api/requests`

**Step 3:** Authorization → Bearer Token → **Admin** er token

**Step 4:** Body khali — **Send**

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Blood requests retrieved successfully",
  "data": [
    {
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
  ]
}
```

---

---

# STEP 13: DELETE REQUEST (Admin Only)

## 📋 API: Delete Request (DELETE /api/requests/:id)

| Item | Value |
|------|-------|
| **Method** | `DELETE` |
| **URL** | `http://localhost:5000/api/requests/<REQUEST_ID>` |
| **Auth** | ✅ Bearer Token lagbe |
| **Role** | Shudhu `admin` |

### Postman e kivabe korbe:

**Step 1:** Method: **DELETE**

**Step 2:** URL: `http://localhost:5000/api/requests/65f3c4d5e6f7a8b9c0d1e2f3`

**Step 3:** Authorization → Bearer Token → Admin token

**Step 4:** Body khali → **Send**

### ✅ Success Response (200):
```json
{
  "success": true,
  "message": "Blood request deleted successfully",
  "data": { "...deleted request..." }
}
```

---

---

# STEP 14: LOCATION APIs (Public — Token lagbe NA)

> Bangladesh er Division, District, Upazila dropdown banate ei APIs use korbe. Data live BD API (`bdapis.com`) theke ashe.

---

## 14.1 — GET Full Location Tree (Shob ekbare)

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/locations` |
| **Auth** | ❌ Lagbe NA |

### Postman e: Method GET → URL likho → Send

### ✅ Response (200):
```json
{
  "success": true,
  "message": "Full location tree retrieved successfully",
  "data": [
    {
      "division": "Barishal",
      "divisionbn": "বরিশাল",
      "coordinates": "22.3811, 90.3372",
      "districts": [
        {
          "district": "Barguna",
          "coordinates": "22.0953, 90.1121",
          "upazilla": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltoli"]
        }
      ]
    },
    {
      "division": "Dhaka",
      "divisionbn": "ঢাকা",
      "coordinates": "23.8103, 90.4125",
      "districts": [
        {
          "district": "Dhaka",
          "coordinates": "23.8103, 90.4125",
          "upazilla": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"]
        },
        {
          "district": "Gazipur",
          "coordinates": "24.0023, 90.4203",
          "upazilla": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"]
        }
      ]
    }
  ]
}
```

> ⚠️ Ei API ta heavy — 8 ta division er shob districts ar upazilas akbare dey. Dropdown er jonno niche er step-by-step APIs better.

---

## 14.2 — GET All Divisions (8 ta)

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/locations/divisions` |
| **Auth** | ❌ Lagbe NA |

### Postman e: GET → `http://localhost:5000/api/locations/divisions` → Send

### ✅ Response (200):
```json
{
  "success": true,
  "message": "Divisions retrieved successfully",
  "data": [
    { "division": "Barishal", "divisionbn": "বরিশাল", "coordinates": "22.3811, 90.3372" },
    { "division": "Chattogram", "divisionbn": "চট্টগ্রাম", "coordinates": "23.1793, 91.9882" },
    { "division": "Dhaka", "divisionbn": "ঢাকা", "coordinates": "23.8103, 90.4125" },
    { "division": "Khulna", "divisionbn": "খুলনা", "coordinates": "22.8456, 89.5403" },
    { "division": "Mymensingh", "divisionbn": "ময়মনসিংহ", "coordinates": "24.7471, 90.4203" },
    { "division": "Rajshahi", "divisionbn": "রাজশাহী", "coordinates": "24.3745, 88.6042" },
    { "division": "Rangpur", "divisionbn": "রংপুর", "coordinates": "25.7439, 89.2752" },
    { "division": "Sylhet", "divisionbn": "সিলেট", "coordinates": "24.8949, 91.8687" }
  ]
}
```

---

## 14.3 — GET Districts by Division

> User division select korar por ei API call koro — oi division er shob district + upazila pabe.

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/locations/districts/<divisionName>` |
| **Auth** | ❌ Lagbe NA |

### Postman Examples:
```
GET http://localhost:5000/api/locations/districts/Dhaka
GET http://localhost:5000/api/locations/districts/Rajshahi
GET http://localhost:5000/api/locations/districts/Chattogram
```

### ✅ Response (200) — Example: `/districts/Dhaka`:
```json
{
  "success": true,
  "message": "Districts of Dhaka retrieved successfully",
  "data": [
    {
      "district": "Dhaka",
      "coordinates": "23.8103, 90.4125",
      "upazilla": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"]
    },
    {
      "district": "Faridpur",
      "coordinates": "23.6070, 89.8429",
      "upazilla": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"]
    },
    {
      "district": "Gazipur",
      "coordinates": "24.0023, 90.4203",
      "upazilla": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"]
    }
  ]
}
```

---

## 14.4 — GET Upazilas by District

> User district select korar por ei API call koro — oi district er shob upazila pabe.

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/api/locations/upazilas/<districtName>` |
| **Auth** | ❌ Lagbe NA |

### Postman Examples:
```
GET http://localhost:5000/api/locations/upazilas/Gazipur
GET http://localhost:5000/api/locations/upazilas/Comilla
GET http://localhost:5000/api/locations/upazilas/Rangpur
```

### ✅ Response (200) — Example: `/upazilas/Gazipur`:
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

---

# STEP 15: HEALTH CHECK

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:5000/health` |
| **Auth** | ❌ Lagbe NA |

### Postman e: GET → `http://localhost:5000/health` → Send

### ✅ Response:
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

---

# 📊 QUICK REFERENCE TABLE — Shob API Ek Nojore

| # | Method | Endpoint | Auth | Role | Body |
|---|--------|----------|------|------|------|
| 1 | `POST` | `/api/users` | ❌ | Public | `{ name, email, role }` |
| 2 | `GET` | `/api/users` | ✅ Token | Admin | Nai |
| 3 | `PATCH` | `/api/users/:id/role` | ✅ Token | Admin | `{ role }` |
| 4 | `POST` | `/api/donors` | ✅ Token | Authenticated | `{ bloodType, location, phone, availability }` |
| 5 | `GET` | `/api/donors?bloodType=A+&district=Dhaka` | ❌ | Public | Nai (Query Params) |
| 6 | `GET` | `/api/donors/:id` | ❌ | Public | Nai |
| 7 | `PUT` | `/api/donors/:id` | ✅ Token | Own profile | `{ bloodType?, location?, phone?, availability? }` |
| 8 | `DELETE` | `/api/donors/:id` | ✅ Token | Admin | Nai |
| 9 | `PATCH` | `/api/donors/:id/approve` | ✅ Token | Admin | Nai |
| 10 | `PATCH` | `/api/donors/:id/reject` | ✅ Token | Admin | Nai |
| 11 | `POST` | `/api/requests` | ✅ Token | Authenticated | `{ bloodType, location, message }` |
| 12 | `GET` | `/api/requests` | ✅ Token | Admin | Nai |
| 13 | `DELETE` | `/api/requests/:id` | ✅ Token | Admin | Nai |
| 14 | `GET` | `/api/locations` | ❌ | Public (Full Tree) | Nai |
| 15 | `GET` | `/api/locations/divisions` | ❌ | Public | Nai |
| 16 | `GET` | `/api/locations/districts/:divisionName` | ❌ | Public | Nai |
| 17 | `GET` | `/api/locations/upazilas/:districtName` | ❌ | Public | Nai |
| 18 | `GET` | `/health` | ❌ | Public | Nai |

---

---

# 🔄 USER FLOW DIAGRAMS

### 1. User Registration + Login Flow:
```
Firebase e email+password diye Signup koro
            ↓
POST /api/users { name, email, role }     ← Backend database e user save hoy
            ↓
Firebase e Login koro (email + password)
            ↓
Firebase theke ID Token pao
            ↓
Postman er Authorization > Bearer Token e token paste koro
            ↓
Ekhon protected API call korte parbe!
```

### 2. Donor Registration → Approval Flow:
```
Donor user login (token pao)
            ↓
POST /api/donors { bloodType, location, phone }    ← Token header e dew
            ↓
Response: status = "pending"  (public search e dekhabe NA)
            ↓
Admin login (admin er token pao)
            ↓
PATCH /api/donors/:id/approve    ← Admin token header e dew
            ↓
Response: status = "approved"  (ekhon public search e dekhabe!)
```

### 3. Blood Request Flow:
```
Requester/Donor/Admin login (token pao)
            ↓
POST /api/requests { bloodType, location, message }
            ↓
Request saved — Admin GET /api/requests e dekhte parbe
```

### 4. Location Dropdown Flow (Frontend er jonno):
```
Page load → GET /api/locations/divisions
            ↓
Division dropdown e 8 ta division dekhao
            ↓
User "Dhaka" select korlo
            ↓
GET /api/locations/districts/Dhaka
            ↓
District dropdown populate koro (Dhaka, Gazipur, Faridpur...)
            ↓
User "Gazipur" select korlo
            ↓
GET /api/locations/upazilas/Gazipur
            ↓
Upazila dropdown populate koro (Gazipur Sadar, Kaliakair, Kaliganj...)
```

---

---

# 🧠 IMPORTANT TIPS

### Blood Type — Exact Values:
```
A+   A-   B+   B-   O+   O-   AB+   AB-
```

### Phone Number Format:
```
01XXXXXXXXX       (11 digit, 01 diye start)
+880XXXXXXXXXX    (with country code)
```

### MongoDB ObjectId:
> Shob `:id` parameter e valid **24 character hex** dite hobe.
> Example: `65f1a2b3c4d5e6f7a8b9c0d1`
> Invalid dile: `400 Bad Request`

### Postman Pro Tip — Collection Level Token:
> Postman e **Collection Level** e token set korle every request e alada kore token dite hobe na:
> 1. Collection name er upor right click → **Edit**
> 2. **Authorization** tab e jao → Type: **Bearer Token**
> 3. Token paste koro
> 4. Ekhon collection er under shob request automatic inherit korbe
> 5. Individual request e Authorization type **Inherit from parent** select koro

---

---

# ❌ COMMON ERRORS & SOLUTIONS

| Error Message | Code | Solution |
|---------------|------|----------|
| `Access denied. No token provided` | 401 | Authorization header e Bearer Token dao |
| `Access denied. Invalid or expired token` | 401 | Token expire — notun token nao Firebase login diye |
| `Access denied. Required roles: admin` | 403 | Tumi admin na — admin er token use koro |
| `User with this email already exists` | 409 | Ei email e already user ache database e |
| `Donor profile already exists for this user` | 409 | Ei user er already donor profile create kora hoye geche |
| `Invalid id` | 400 | MongoDB ObjectId wrong — 24 character hex hote hobe |
| `Route not found` | 404 | URL bhul — endpoint check koro |
| `Too many requests, please try again later` | 429 | Rate limit — 15 minute e 100 er beshi request hoyeche, wait koro |
| `User not found` | 404 | Oi email/id er user database e nai |
| `Donor not found` | 404 | Oi id er donor database e nai |

---
