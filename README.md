# Login & Register Project
A full-stack web application featuring user registration, login authentication, and a secure dashboard built with React (Vite) on the frontend and Node.js/Express with MySQL on the backend.

## 🌟 Key Features
* 🛡️ **Secure Authentication** using bcrypt password hashing and JWT tokens.
* 🚦 **Routing & Protected Views** using `react-router-dom`.
* 💎 **Glassmorphism UI** with a dynamic, aesthetic design and smooth animations.
* 📦 **MVC Architecture** on the server for cleaner code.
* 🗄️ **Automatic Database Setup**: Creates the `users` table automatically on initialization.
* 🔄 **RESTful API** with proper error handling and validation.
* 🍪 **Cookie-based Session Management** for enhanced security.

## 🛠️ Technology Stack
* **Frontend:** React 18, Vite, React Router DOM, Axios, Vanilla CSS (Glassmorphism)
* **Backend:** Node.js, Express.js, Sequelize ORM
* **Database:** MySQL2 with Connection Pool
* **Authentication:** bcrypt (Password Hashing), JWT (JSON Web Tokens)
* **Other Tools:** dotenv (Environment variables), CORS, Cookie-Parser, Nodemon

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
JWT_SECRET=your_jwt_secret_key_here
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

| Method | Endpoint | Description | Request Body | Response |
|--------|---------|-------------|--------------|----------|
| `POST` | `/api/auth/register` | Register a new user | `{ name, email, password }` | `{ success: true, message: "User created successfully" }` |
| `POST` | `/api/auth/login` | Login an existing user | `{ email, password }` | `{ success: true, token: "jwt_token", user: { id, name, email } }` |
| `GET` | `/api/auth/dashboard` | Access protected dashboard (requires JWT) | - | `{ success: true, user: { id, name, email } }` |
| `POST` | `/api/auth/logout` | Logout user (clears cookie) | - | `{ success: true, message: "Logged out successfully" }` |

---

## 🔒 Security
- **Password Hashing**: Passwords are encrypted using bcrypt before database storage
- **JWT Authentication**: Secure token-based authentication for protected routes
- **CORS Protection**: Cross-Origin Resource Sharing enabled only for secure frontend requests
- **Input Validation**: Server-side validation for all user inputs
- **Environment Variables**: Sensitive data stored in environment variables

---

## 🎨 UI/UX Features
- **Glassmorphism Design**: Modern frosted glass effect with backdrop filters
- **Responsive Layout**: Fully responsive design for all screen sizes
- **Smooth Animations**: CSS transitions and hover effects for enhanced user experience
- **Form Validation**: Real-time client-side validation with user-friendly error messages
- **Loading States**: Visual feedback during API calls and form submissions

---

## 📝 Scripts & Commands

### Backend Scripts
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author
**Dheeraj**
- GitHub: [@dheeraj0808](https://github.com/dheeraj0808)

---

## 🙏 Acknowledgments
- React Router DOM for seamless routing
- Express.js for robust backend framework
- MySQL for reliable database management
- Vite for fast development experience
