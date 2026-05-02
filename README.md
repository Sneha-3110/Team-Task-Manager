# TeamManager

### [🚀Live Demo ↗](https://team-task-manager-production-5bf2.up.railway.app/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-111827?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)

TeamManager is a full-stack task management app for small teams. Admin users can create tasks and assign them to members, while members can log in, view their assigned work, and update task status.

The frontend is built with React, Vite, Tailwind CSS, and Lucide icons. The backend uses Express, MongoDB, Mongoose, JWT authentication, and bcrypt password hashing.

## ✨ Features

- 🏠 Landing page with clear calls to action
- 🔐 Separate Login and Register pages
- 🧑‍💼 Role-based access for Admin and Member users
- 🎫 JWT-based authentication
- 📝 Admin task creation screen
- 📋 Member task dashboard
- ✅ Task status updates: `To-Do`, `In-Progress`, `Done`
- 🛡️ Protected routes for dashboard and admin screens
- 🎨 Responsive modern UI with Tailwind CSS

## 🧰 Tech Stack

Frontend:

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧭 React Router
- 🔌 Axios
- 🖼️ Lucide React

Backend:

- 🟢 Node.js
- 🚏 Express
- 🍃 MongoDB
- 🧬 Mongoose
- 🎫 JSON Web Tokens
- 🔒 bcryptjs
- ⚙️ dotenv

## 📁 Project Structure

```text
TaskManager/
|-- backend/
|   |-- middleware/
|   |   `-- auth.js
|   |-- models/
|   |   |-- Project.js
|   |   |-- Task.js
|   |   `-- User.js
|   |-- routes/
|   |   |-- auth.js
|   |   |-- projects.js
|   |   |-- tasks.js
|   |   `-- users.js
|   |-- server.js
|   `-- package.json
`-- frontend/
    |-- public/
    |-- src/
    |   |-- api/
    |   |   `-- api.js
    |   |-- components/
    |   |   |-- NavBar.jsx
    |   |   `-- TaskCard.jsx
    |   |-- pages/
    |   |   |-- AdminPanel.jsx
    |   |   |-- Dashboard.jsx
    |   |   |-- Landing.jsx
    |   |   |-- Login.jsx
    |   |   `-- Register.jsx
    |   |-- App.jsx
    |   |-- index.css
    |   `-- main.jsx
    `-- package.json
```

## 🚀 Getting Started

### ✅ Prerequisites

- 🟢 Node.js
- 📦 npm
- 🍃 MongoDB connection string

### 1. 📦 Install dependencies

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. ⚙️ Configure backend environment

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. 🟢 Run the backend

```bash
cd backend
npm start
```

The API runs on:

```text
http://localhost:5000/api
```

### 4. ⚡ Run the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The app runs on:

```text
http://localhost:5173
```

## 🧭 Frontend Routes

| Icon | Route | Page | Access |
| --- | --- | --- | --- |
| 🏠 | `/` | Landing page | Public |
| 🔐 | `/login` | Login page | Public |
| 📝 | `/register` | Register page | Public |
| 📋 | `/dashboard` | Task dashboard | Authenticated users |
| 🛡️ | `/admin` | Admin task creation | Admin only |

## 🔌 API Routes

Authentication:

| Icon | Method | Endpoint | Description |
| --- | --- | --- | --- |
| 📝 | `POST` | `/api/auth/register` | Register a new user |
| 🔐 | `POST` | `/api/auth/login` | Login an existing user |

Users:

| Icon | Method | Endpoint | Description |
| --- | --- | --- | --- |
| 👥 | `GET` | `/api/users/members` | Get all member users, admin only |

Tasks:

| Icon | Method | Endpoint | Description |
| --- | --- | --- | --- |
| ➕ | `POST` | `/api/tasks` | Create a task, admin only |
| 📋 | `GET` | `/api/tasks` | Get tasks for current user |
| ✅ | `PATCH` | `/api/tasks/:id` | Update task status |

Projects:

| Icon | Method | Endpoint | Description |
| --- | --- | --- | --- |
| ➕ | `POST` | `/api/projects` | Create a project, admin only |
| 📁 | `GET` | `/api/projects` | Get visible projects |

## 🧪 Available Scripts

Frontend:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Backend:

```bash
npm start
```

## 👥 User Roles

Admin:

- 🛡️ Can access the admin panel
- 👥 Can view members
- 📝 Can create tasks
- 📌 Can assign tasks to members

Member:

- 📋 Can access the dashboard
- 👀 Can view assigned tasks
- ✅ Can update task status

## 🗒️ Notes

- 🔌 The frontend expects the backend API at `http://localhost:5000/api`.
- 💾 Auth tokens and user details are stored in `localStorage`.
- 🛡️ Admin-only routes are protected on both the frontend and backend.
- 🍃 MongoDB must be running or reachable through `MONGO_URI`.
