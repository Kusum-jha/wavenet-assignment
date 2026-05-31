WaveNet Assignment - Invoice Management System

Overview

WaveNet Invoice Management System is a full-stack MERN application developed for managing users and invoices with secure authentication and role-based access.

The application provides:

- User Authentication using JWT
- User Management
- Invoice Management
- Search and Filtering
- MongoDB Atlas Integration
- Deployed Frontend and Backend

---

Tech Stack

Frontend

- React.js
- Axios
- React Router
- CSS

Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs

Database

- MongoDB Atlas
- Mongoose

Deployment

- Frontend: Netlify
- Backend: Render

---

Features

Authentication

- User Login
- JWT Token Authentication
- Protected API Routes

User Management

- Create User
- View Users
- Search Users
- Update User Roles
- Delete Users

Invoice Management

- Create Invoice
- View Invoices
- Search Invoices
- Filter by Financial Year
- Delete Invoices

---

Project Structure

wavenet-assignment/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   └── public/
│
└── README.md

---

Installation

Clone Repository

git clone https://github.com/Kusum-jha/wavenet-assignment.git
cd wavenet-assignment

---

Backend Setup

cd backend
npm install

Create a ".env" file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start Backend:

npm run dev

---

Frontend Setup

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173

---

API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Users

GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

Invoices

GET    /api/invoices
POST   /api/invoices
PUT    /api/invoices/:id
DELETE /api/invoices/:id

---

Live Deployment

Frontend

https://guileless-tiramisu-fb6896.netlify.app

Backend

https://wavenet-assignment-iov9.onrender.com

GitHub Repository

https://github.com/Kusum-jha/wavenet-assignment

---

Demo Credentials

Email: kusum@example.com
Password: 123456

---

Future Improvements

- Advanced Role Hierarchy
- Dashboard Analytics
- Invoice Update Module
- Enhanced UI/UX
- Pagination Improvements
- Activity Logs

---

Author

Kusum Jha

Full Stack Development Internship Assignment

Built using the MERN Stack.
