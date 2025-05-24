# 🔧 Engine API – PostgreSQL Database & ABE User Management

This API provides endpoints to:

- List PostgreSQL databases
- List tables in a selected database
- Manage system users
- Assign user permissions using **Attribute-Based Encryption (ABE)** principles

---

## 📌 Base URL

```
/api/engine
```

---

## 📂 Endpoints

### 1. GET `/api/engine/databases`

List all non-template PostgreSQL databases.

**Response:**
```json
{
  "databases": ["postgres", "sales_db", "analytics_db"]
}
```

---

### 2. GET `/api/engine/:database/tables`

List all tables in the specified database.

**Params:**
- `:database` – the name of the target database

**Response:**
```json
{
  "tables": ["users", "orders", "products"]
}
```

---

### 3. GET `/api/engine/users`

Retrieve all registered users and their attributes.

**Response:**
```json
[
  {
    "id": 1,
    "username": "alice",
    "attributes": ["admin", "sales"]
  },
  {
    "id": 2,
    "username": "bob",
    "attributes": ["viewer"]
  }
]
```

---

### 4. POST `/api/engine/users`

Create a new user with attributes.

**Request Body:**
```json
{
  "username": "newuser",
  "attributes": ["admin", "hr"]
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "userId": 3
}
```

---

### 5. PATCH `/api/engine/users/:id/permissions`

Update a user’s attributes (used in ABE for access control).

**Params:**
- `:id` – user ID

**Request Body:**
```json
{
  "attributes": ["finance", "hr"]
}
```

**Response:**
```json
{
  "message": "Attributes updated"
}
```

---

### 6. DELETE `/api/engine/users/:id`

Delete a user by ID.

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## 🔐 Attribute-Based Encryption (ABE)

This system controls access to encrypted data based on attributes assigned to each user.

### 🔑 How it works:

- Data is encrypted using attribute-based policies, such as:
  ```
  "admin AND finance"
  ```

- A user with attributes `["admin", "finance"]` can decrypt that data.

- This enables **fine-grained access control** on sensitive data (like salary, reports, etc.).

---

## ⚠️ Security Notes

- Protect all endpoints with authentication (JWT, OAuth2, session-based, etc.)
- Avoid exposing low-level DB access in production
- Use HTTPS in production to secure communication
- Consider role separation: Admins vs. Users

---

## ✅ Next Steps

- [ ] Add token-based authentication (e.g. JWT)
- [ ] Implement middleware for attribute policy enforcement
- [ ] Encrypt data using ABE-compatible libraries
- [ ] Build admin UI dashboard for user/permission management

---

## 📁 Project Structure

```
app/
  api/
    engine/
      route.ts                     # Main router (optional)
      databases/route.ts           # GET all databases
      [database]/tables/route.ts   # GET tables of a DB
      users/
        route.ts                   # GET/POST users
        [id]/permissions/route.ts # PATCH user attributes
        [id]/route.ts              # DELETE user
lib/
  db.ts                            # PostgreSQL client
.env.local                         # DB connection settings
```

---

## 🧩 Tech Stack

- **Next.js App Router**
- **PostgreSQL**
- **pg (node-postgres)**
- **TypeScript**

---

## 🧠 License

MIT – Use freely and modify as needed.

---
