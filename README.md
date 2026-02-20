# Login & Register Project
A full-stack web application featuring user registration, login authentication, and a secure dashboard built with React (Vite) on the frontend and Node.js/Express with MySQL on the backend.

## 🌟 Key Features
* 🛡️ **Secure Authentication** using bcrypt password hashing.
* 🚦 **Routing & Protected Views** using `react-router-dom`.
* 💎 **Glassmorphism UI** with a dynamic, aesthetic design and smooth animations.
* 📦 **MVC Architecture** on the server for cleaner code.
* 🗄️ **Automatic Database Setup**: Creates the `users` table automatically on initialization.

## 🛠️ Technology Stack
* **Frontend:** React, Vite, React Router DOM, Lucide-React, Vanilla CSS (Glassmorphism).
* **Backend:** Node.js, Express.js.
* **Database:** MySQL2 (Connection Pool).
* **Other Tools:** bcrypt (Hashing), dotenv (Environment variables), CORS.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and a MySQL server (like XAMPP, MAMP, or native) running. In your MySQL instance, create a database named `loginregister`:
```sql
CREATE DATABASE loginRegister;
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/dheeraj0808/LoginRegister.git
cd LoginRegister
```

**2. Setup Backend**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add your database configuration:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=loginRegister
DB_PORT=3306
```
Start the backend server (starts on `http://localhost:5000`):
```bash
npm run dev
```

**3. Setup Frontend**
Open a **new terminal tab/window**, then:
```bash
cd frontend
npm install
```
Start the frontend server (starts on `http://localhost:5173`):
```bash
npm run dev
```

---

## 📁 Project Structure

```text
LoginRegister/
├── backend/
│   ├── .env               # Database properties and port
│   ├── server.js          # Entry point for backend server
│   └── src/
│       ├── app.js         # Express app and middleware setup
│       ├── db/db.js       # MySQL connection pool
│       ├── models/        # Database models (User.js)
│       └── routes/        # API endpoints (authRoutes.js)
│
└── frontend/
    ├── src/
    │   ├── App.jsx        # Routes setup (/, /login, /register, /dashboard)
    │   ├── index.css      # Core styles & aesthetic glassmorphisms
    │   ├── main.jsx       # BrowserRouter entry
    │   └── components/
    │       ├── Login.jsx      # Login page
    │       ├── Register.jsx   # Register page
    │       └── Dashboard.jsx  # Main Dashboard (Post-Login)
```

## 🌐 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|---------|-------------|--------------|
| `POST` | `/api/auth/register` | Register a new user | `{ name, email, password }` |
| `POST` | `/api/auth/login` | Login an existing user | `{ email, password }` |

---

## 🔒 Security
- Passwords are encrypted before insertion into the database to ensure maximum security against breaches.
- Cross-Origin Resource Sharing (CORS) is enabled to only allow secure frontend requests to backend paths.
