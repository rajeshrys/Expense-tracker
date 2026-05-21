<div align="center">

# 💰 FinTrack — Personal Finance Tracker

**A full-stack personal finance management application to track income, expenses, and savings with visual analytics.**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

[Live Demo](https://expense-tracker-five-tau-66.vercel.app) · [Report Bug](https://github.com/rajeshrys/Expense-tracker/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Execution Flow](#-execution-flow)
- [Authentication Flow](#-authentication-flow)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 📖 About the Project

FinTrack is a full-stack web application that helps users manage their personal finances. Users can register, log in, and then track their income and expenses through an intuitive dashboard. The app provides visual analytics using pie charts, a unified transaction history, and full CRUD operations on all financial records. It also includes a profile management page where users can update their credentials.

The frontend is built with **React + Vite** and styled with **Tailwind CSS**, while the backend is a **Node.js / Express** REST API with **MongoDB** as the database, deployed across **Vercel** (frontend) and **Render** (backend).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Secure register, login, and logout with JWT tokens & bcrypt password hashing |
| 📊 **Dashboard Analytics** | Pie charts for income by category and expenses by payment method (Recharts) |
| 💵 **Income Management** | Full CRUD — create, read, update, and delete income records |
| 💸 **Expense Management** | Full CRUD — create, read, update, and delete expense records |
| 📜 **Transaction History** | Combined income + expense history sorted by date on the dashboard |
| 👤 **Profile Management** | View and update username, email, and password |
| 🛡️ **Protected Routes** | Client-side route guards redirect unauthenticated users to login |
| 🔑 **Token Blacklisting** | Logout invalidates the JWT by storing it in a blacklist collection |
| 📱 **Responsive Design** | Mobile-first UI with collapsible sidebar navigation |
| 🌐 **Cross-Origin Deployment** | Frontend on Vercel, backend on Render with Bearer token auth |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Axios | HTTP client for API calls |
| Recharts | Data visualization (pie charts) |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express 5 | Web framework |
| MongoDB + Mongoose 9 | Database & ODM |
| JSON Web Token (JWT) | Authentication tokens |
| bcrypt | Password hashing |
| cookie-parser | Cookie handling |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Vercel)                           │
│                                                                  │
│  React + Vite + Tailwind CSS                                     │
│                                                                  │
│  ┌──────────┐   ┌──────────┐   ┌───────────┐   ┌─────────────┐  │
│  │  Pages   │──>│  Hooks   │──>│  API Layer│──>│ Axios Instance│ │
│  │(UI/Forms)│   │(useAuth) │   │(authApi.js)│  │ (lib/axios)  │  │
│  └──────────┘   └──────────┘   └───────────┘   └──────┬──────┘  │
│                                                        │         │
│  ┌────────────────┐   ┌────────────────────┐           │         │
│  │ AuthContext     │   │ ProtectedRoute     │           │         │
│  │ (global state)  │   │ (route guard)      │           │         │
│  └────────────────┘   └────────────────────┘           │         │
└────────────────────────────────────────────────────────┼─────────┘
                        HTTPS + Bearer Token             │
┌────────────────────────────────────────────────────────▼─────────┐
│                       SERVER (Render)                            │
│                                                                  │
│  Node.js + Express                                               │
│                                                                  │
│  ┌──────────┐   ┌────────────┐   ┌──────────────┐   ┌────────┐  │
│  │  Routes  │──>│ Middleware  │──>│ Controllers   │──>│ Models │  │
│  │          │   │(JWT verify) │   │(business logic)│  │(Mongo) │  │
│  └──────────┘   └────────────┘   └──────────────┘   └───┬────┘  │
│                                                          │       │
└──────────────────────────────────────────────────────────┼───────┘
                                                           │
┌──────────────────────────────────────────────────────────▼───────┐
│                     MongoDB Atlas (Cloud)                        │
│                                                                  │
│  Collections: users | incomes | expenses | blacklists            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Expense-tracker/
├── .gitignore
├── README.md
│
├── backend/
│   ├── server.js                          # Entry point — starts Express & connects DB
│   ├── package.json
│   └── src/
│       ├── app.js                         # Express app config (CORS, routes, middleware)
│       ├── config/
│       │   └── db.js                      # MongoDB connection via Mongoose
│       ├── middleware/
│       │   └── auth.middleware.js          # JWT verification middleware
│       ├── models/
│       │   ├── user.model.js              # User schema (username, email, password)
│       │   ├── Income.model.js            # Income schema
│       │   ├── expense.model.js           # Expense schema
│       │   └── blacklist.model.js         # Token blacklist schema
│       ├── controllers/
│       │   ├── auth.controller.js         # Register, login, logout, getMe
│       │   ├── income.controller.js       # Income CRUD operations
│       │   ├── expense.controller.js      # Expense CRUD operations
│       │   └── profile.controller.js      # Update user profile
│       └── routes/
│           ├── auth.routes.js             # /api/auth/*
│           ├── income.routes.js           # /api/income/*
│           ├── expese.routes.js           # /api/expense/*
│           └── update.routes.js           # /api/update/*
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx                       # App entry — BrowserRouter + AuthProvider
        ├── App.jsx                        # Root component — renders Approutes
        ├── index.css
        ├── Context/
        │   └── Authcontext.jsx            # React Context for user & loading state
        ├── hooks/
        │   └── useAuth.js                 # Custom hook — all auth & CRUD handlers
        ├── api/
        │   └── authApi.js                 # Axios API call functions
        ├── lib/
        │   └── axios.js                   # Axios instance with baseURL + token interceptor
        ├── routes/
        │   ├── Approutes.jsx              # Route definitions
        │   └── ProtectedRoute.jsx         # Auth guard component
        ├── components/
        │   └── SideBar.jsx                # Reusable collapsible sidebar
        └── pages/
            ├── Homepage.jsx               # Landing page (public)
            ├── Loginpage.jsx              # Login form
            ├── Registerpage.jsx           # Registration form
            ├── UserDashboard.jsx          # Dashboard with charts & history
            ├── Income.jsx                 # Income form + records table
            ├── Expense.jsx                # Expense form + records table
            └── Profile.jsx               # User profile & settings
```

---

## 🗄️ Database Schema

### User
```js
{
  username:  String   // required
  email:     String   // required, unique, lowercase, trimmed
  password:  String   // required, stored as bcrypt hash
}
```

### Income
```js
{
  amount:        Number   // required
  title:         String   // required
  category:      String   // enum: SALARY | BUSINESS | FREELANCE
  date:          Date     // required
  paymentMethod: String   // enum: UPI | CASH | CHEQUE
  user:          ObjectId // ref -> User
  createdAt:     Date     // auto (timestamps)
  updatedAt:     Date     // auto (timestamps)
}
```

### Expense
```js
{
  amount:        Number   // required
  title:         String   // required
  category:      String   // enum: FOOD | HEALTH | SHOPPING
  date:          Date     // required
  paymentMethod: String   // enum: UPI | CASH | CHEQUE
  user:          ObjectId // ref -> User
  createdAt:     Date     // auto (timestamps)
  updatedAt:     Date     // auto (timestamps)
}
```

### Blacklist (Token Invalidation)
```js
{
  token:     String   // required — the invalidated JWT
  createdAt: Date     // auto (timestamps)
}
```

---

## 📡 API Reference

> **Base URL:** `https://expense-tracker-qr9e.onrender.com/api`

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | No | Register a new user |
| `POST` | `/login` | No | Login & receive JWT |
| `GET` | `/logout` | Yes | Logout & blacklist token |
| `GET` | `/getme` | Yes | Get current user profile |

### Income Routes — `/api/income`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create` | Yes | Create an income record |
| `GET` | `/get` | Yes | Get all income records for the user |
| `GET` | `/get/:category` | Yes | Filter income by category |
| `PATCH` | `/update/:id` | Yes | Update an income record |
| `DELETE` | `/delete/:id` | Yes | Delete a single income record |
| `DELETE` | `/deleteall` | Yes | Delete all income records for the user |

### Expense Routes — `/api/expense`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create` | Yes | Create an expense record |
| `GET` | `/get` | Yes | Get all expense records for the user |
| `GET` | `/get/:category` | Yes | Filter expenses by category |
| `PATCH` | `/update/:id` | Yes | Update an expense record |
| `DELETE` | `/delete/:id` | Yes | Delete a single expense record |
| `DELETE` | `/deleteall` | Yes | Delete all expense records for the user |

### Profile Routes — `/api/update`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/updateuser` | Yes | Update user name, email, or password |

> **Auth = Yes** means the request requires `Authorization: Bearer <token>` header

---

## 🔄 Execution Flow

### 1. Application Startup

```
SERVER STARTUP
──────────────
server.js
  ├── Load environment variables (dotenv)
  ├── Import Express app from src/app.js
  ├── Connect to MongoDB Atlas (src/config/db.js)
  │     └── mongoose.connect(MONGOOSE_URL)
  └── Start listening on PORT

CLIENT STARTUP
──────────────
main.jsx
  ├── Wrap app in <BrowserRouter>
  ├── Wrap app in <AuthProvider> (React Context)
  └── Render <App />
        └── <Approutes /> -> maps URL paths to page components
```

### 2. Request Lifecycle (Frontend -> Backend -> Database)

```
User Action (e.g., "Add Income")
        │
        ▼
┌─ Page Component (Income.jsx) ─────────────────────────────┐
│  1. User fills form fields (title, amount, category, etc.)│
│  2. Form submission calls useAuth() hook handler           │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌─ useAuth Hook (hooks/useAuth.js) ─────────────────────────┐
│  3. Sets loading = true                                    │
│  4. Calls API function: userincome(data)                   │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌─ API Layer (api/authApi.js) ──────────────────────────────┐
│  5. Calls api.post("/income/create", userData)             │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌─ Axios Instance (lib/axios.js) ──────────────────────────┐
│  6. Interceptor attaches Bearer token from localStorage    │
│  7. Sends HTTP request to backend                          │
└───────────────────────┬───────────────────────────────────┘
                        │
            HTTPS Request (POST /api/income/create)
                        │
                        ▼
┌─ Express Router (routes/income.routes.js) ────────────────┐
│  8. Route matched -> runs authMiddleware first              │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌─ Auth Middleware (middleware/auth.middleware.js) ──────────┐
│  9. Extracts token from cookies or Authorization header    │
│ 10. Verifies JWT with secret key                           │
│ 11. Finds user by decoded _id -> attaches to req.user       │
│ 12. Calls next()                                           │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌─ Controller (controllers/income.controller.js) ──────────┐
│ 13. Validates required fields                              │
│ 14. Creates document in MongoDB: incomemodel.create(...)   │
│ 15. Returns JSON response with created record              │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌─ MongoDB Atlas ──────────────────────────────────────────┐
│ 16. Document stored in "incomes" collection               │
└──────────────────────────────────────────────────────────┘
```

### 3. Dashboard Data Flow

```
UserDashboard.jsx mounts
        │
        ▼
useEffect -> fetchdata()
        │
        ├── handlegetincome()  -> GET /api/income/get  -> returns income[]
        ├── handlegetexpense() -> GET /api/expense/get  -> returns expense[]
        │
        ▼
State Updated:
  ├── incomedata[] and expensedata[]
  ├── totalincome  = sum of all income amounts
  ├── totalexpense = sum of all expense amounts
  ├── savings      = totalincome - totalexpense
  │
  ├── Pie Chart 1: Income grouped by category (SALARY/BUSINESS/FREELANCE)
  ├── Pie Chart 2: Expenses grouped by payment method (UPI/CASH/CHEQUE)
  │
  └── Transaction History: merged income + expense, sorted by date (newest first)
```

---

## 🔐 Authentication Flow

```
┌─────────────── REGISTRATION ────────────────┐
│                                              │
│  1. User submits: username, email, password  │
│  2. Backend hashes password with bcrypt      │
│  3. User document created in MongoDB         │
│  4. JWT signed with user._id (expires: 3d)   │
│  5. Token returned in response body          │
│  6. Frontend redirects to /login             │
│                                              │
└──────────────────────────────────────────────┘

┌─────────────── LOGIN ───────────────────────┐
│                                              │
│  1. User submits: email, password            │
│  2. Backend finds user by email              │
│  3. bcrypt.compare(password, hash)           │
│  4. JWT signed with user._id (expires: 3d)   │
│  5. Token returned in response body          │
│  6. Frontend stores token in localStorage    │
│  7. User state set in AuthContext            │
│  8. Navigate to /userdashboard               │
│                                              │
└──────────────────────────────────────────────┘

┌─────────────── AUTHENTICATED REQUESTS ──────┐
│                                              │
│  1. Axios interceptor reads localStorage     │
│  2. Attaches: Authorization: Bearer <token>  │
│  3. Backend middleware verifies JWT           │
│  4. Decoded user attached to req.user         │
│  5. Controller uses req.user for DB queries   │
│                                              │
└──────────────────────────────────────────────┘

┌─────────────── ROUTE PROTECTION ────────────┐
│                                              │
│  ProtectedRoute component checks:            │
│    -> localStorage.getItem("token")          │
│    -> If no token: redirect to /login        │
│    -> If token exists: render children        │
│                                              │
│  Protected pages:                            │
│    /userdashboard, /income, /expense,        │
│    /profile                                  │
│                                              │
└──────────────────────────────────────────────┘

┌─────────────── LOGOUT ──────────────────────┐
│                                              │
│  1. GET /api/auth/logout                     │
│  2. Token added to blacklist collection      │
│  3. Cookie cleared on server                 │
│  4. Frontend clears localStorage             │
│  5. Redirect to homepage                     │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git**

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/rajeshrys/Expense-tracker.git
cd Expense-tracker
```

**2. Setup Backend**

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGOOSE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

**3. Setup Frontend**

```bash
cd frontend
npm install
```

Update the API base URL in `src/lib/axios.js` if running locally:

```js
const api = axios.create({
    baseURL: "http://localhost:3000/api",  // for local development
    withCredentials: true
});
```

Start the frontend dev server:

```bash
npm run dev
```

**4. Open in browser**

```
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port for the backend server | `3000` |
| `MONGOOSE_URL` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/fintrack` |
| `JWT_SECRET` | Secret key for signing JWTs | `my_super_secret_key_123` |

---

## 🌍 Deployment

### Frontend — Vercel

1. Push the `frontend/` directory to a GitHub repository
2. Import the project in [Vercel](https://vercel.com)
3. Set the **Root Directory** to `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`

### Backend — Render

1. Push the `backend/` directory to a GitHub repository
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the **Root Directory** to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables (`PORT`, `MONGOOSE_URL`, `JWT_SECRET`)

> **Important:** Update the CORS origin in `backend/src/app.js` and the Axios base URL in
> `frontend/src/lib/axios.js` to match your deployed URLs.

---

## 📸 Screenshots

### Landing Page
> A modern hero section with gradient overlays, glassmorphism navbar, and feature cards.

### Dashboard
> Summary cards showing Savings, Income, and Expense totals.
> Interactive pie charts for income by category and expenses by payment method.
> Recent transaction history table.

### Income / Expense Pages
> Form to add new records with validation.
> Tabular display of all records with inline edit, update, and delete capabilities.

### Profile Page
> View current user details with option to update name, email, and password.

---

## 👤 Author

**Thati Rajesh**

- GitHub: [@rajeshrys](https://github.com/rajeshrys)
- LinkedIn: [Thati Rajesh](https://www.linkedin.com/in/thati-rajesh-b25aa62b3)
- Email: rajeshthati535@gmail.com

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

</div>
