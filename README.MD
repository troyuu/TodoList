# To Do List (MERN Stack)

A full-stack To Do List application built using the MERN stack with secure authentication and protected CRUD operations.

This project demonstrates user authentication with JWT, user-scoped data access, and proper frontend and backend validation.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (httpOnly cookies)

---

## Implemented Features

### Authentication (JWT)
- User registration
- User login
- User logout
- JWT stored in **httpOnly cookies**
- Session persistence using `GET /api/auth/me`
- Protected routes using authentication middleware

### Todo List (CRUD)
- **Create** todo items
- **Read** todos (user-specific)
- **Update** todos (edit content and status)
- **Delete** todos

### Database & Data Ownership
- MongoDB with Mongoose schemas
- One-to-many relationship:
  - One user → many todos
- Todos are scoped to the authenticated user
- Users can only access their own todos

### Validation
- Frontend validation:
  - Title is required
  - Max title length: 255 characters
- Backend validation:
  - Title required, max 255 characters
  - Status enum: `pending | completed`
  - Optional due date must be a valid date
- Error messages are returned and displayed appropriately

---

## Todo Data Structure

| Field        | Type     | Required | Description |
|-------------|----------|----------|-------------|
| title       | String   | Yes      | Max 255 characters |
| description | String   | No       | Optional details |
| status      | Enum     | Yes      | `pending` or `completed` |
| dueDate     | Date     | No       | Optional deadline |
| user        | ObjectId | Yes      | Reference to owning user |

---

## Project Structure

# To Do List (MERN Stack)

A full-stack To Do List application built using the MERN stack with secure authentication and protected CRUD operations.

This project demonstrates user authentication with JWT, user-scoped data access, and proper frontend and backend validation.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (httpOnly cookies)

---

## Implemented Features

### Authentication (JWT)
- User registration
- User login
- User logout
- JWT stored in **httpOnly cookies**
- Session persistence using `GET /api/auth/me`
- Protected routes using authentication middleware

### Todo List (CRUD)
- **Create** todo items
- **Read** todos (user-specific)
- **Update** todos (edit content and status)
- **Delete** todos

### Database & Data Ownership
- MongoDB with Mongoose schemas
- One-to-many relationship:
  - One user → many todos
- Todos are scoped to the authenticated user
- Users can only access their own todos

### Validation
- Frontend validation:
  - Title is required
  - Max title length: 255 characters
- Backend validation:
  - Title required, max 255 characters
  - Status enum: `pending | completed`
  - Optional due date must be a valid date
- Error messages are returned and displayed appropriately

---

## Todo Data Structure

| Field        | Type     | Required | Description |
|-------------|----------|----------|-------------|
| title       | String   | Yes      | Max 255 characters |
| description | String   | No       | Optional details |
| status      | Enum     | Yes      | `pending` or `completed` |
| dueDate     | Date     | No       | Optional deadline |
| user        | ObjectId | Yes      | Reference to owning user |

---

## Project Structure


To Do list/
README.md
.gitignore
backend/
src/
config/ # environment & database config
controllers/ # auth & todo controllers
middlewares/ # auth guard & error handling
models/ # Mongoose schemas
routes/ # API routes
utils/ # JWT helpers
app.js
server.js
.env.example
frontend/
src/
api/ # API client & endpoints
auth/ # Auth context & guards
components/ # UI components
pages/ # Pages (Auth, Home)
.env.example


---

## Design Decisions & Assumptions

- **JWT stored in httpOnly cookies** for better security (prevents XSS access).
- Authentication is handled server-side via middleware.
- MongoDB is used instead of SQL, so traditional migrations are replaced by Mongoose schemas.
- Frontend state is restored on refresh using `/api/auth/me`.
- Validation is enforced on both frontend and backend for reliability.

---

## Setup & Installation

### Prerequisites
- Node.js (LTS recommended)
- MongoDB Atlas account or local MongoDB

---

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "To Do list"


2. Backend Setup
cd backend
npm install


Create a .env file using .env.example as reference:

PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
JWT_EXPIRES_IN=7d


Start backend:

npm run dev


Backend runs at:

http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install


Create .env using .env.example:

VITE_API_URL=http://localhost:5000


Start frontend:

npm run dev


Frontend runs at:

http://localhost:5173

API Endpoints (Reference)
Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

Todos (Protected)

GET /api/todos

POST /api/todos

PATCH /api/todos/:id

DELETE /api/todos/:id

Security Notes

.env files are ignored and never committed

Secrets are documented using .env.example

JWT cookies use SameSite=Lax for local development

In production, HTTPS and secure: true should be enabled

Summary

This project fulfills all required specifications:

Secure JWT authentication

Full CRUD functionality

Proper data relationships

User-scoped access control

Validation and error handling

Built with clean architecture and best practices suitable for real-world MERN applications.


