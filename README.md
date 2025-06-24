# 📝 TaskFlow - Task Management API

A RESTful backend API for managing tasks with secure user authentication. Built with Java Spring Boot, JWT-based security, Docker Compose, and input validation.

---

## 🚀 Features

- ✅ **User Authentication**

  - Register / Login
  - JWT-based stateless authentication

- 🛡 **Security**

  - Role-based access control
  - Password encryption with BCrypt

- 🧾 **Task Management**

  - Create / Read / Update / Delete tasks
  - Task status enum (e.g., `PENDING`, `ONGOING`, `DONE`)
  - Input validation with meaningful error messages

- 🐳 **Dockerized Setup**

  - Docker Compose for backend, frontend and PostgreSQL

- 🧪 **Error Handling**
  - Centralized exception handling
  - Custom error messages with `messages.properties`

---

## 🛠️ Tech Stack

- Java 17+
- Spring Boot
- Spring Security + JWT
- JPA / Hibernate
- PostgreSQL
- Docker Compose
- Maven
- Jakarta Validation

---

## 📦 Installation

````bash
# Clone the repo
git clone https://github.com/Zakaria-Tajer/TaskFlow.git
cd taskflow

### 2. Setup environment variables

#### Backend
Create `.env `file in `backend/tasks`and update the values:

JWT_SECRET=your_jwt_secret_here
DB_HOST=taskflow_db
DB_PORT=your_db_port
DB_NAME=your_db_name
DB_USER=your_db_name
DB_PASSWORD=your_db_password

#### Frontend
Create `.env `file in `TaskFlow-Frontend/`and update the base-url as needed:

VITE_API_URL=http://localhost:8080/api

# Backend Setup

```bash
cd backend
./mvnw clean install

# Frontend Setup

```bash
cd TaskFlow-Frontend
npm install

# Run with Docker
docker-compose up --build

````

## 🔐 Backend API Usage

### 🧑‍💻 Authentication Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register a new user   |
| POST   | /api/auth/login    | Login and receive JWT |

### 📝 Task Endpoints (🔒 Requires JWT)

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | /api/tasks      | Get all tasks           |
| GET    | /api/tasks/{id} | Get a specific task     |
| POST   | /api/tasks      | Create a new task       |
| PUT    | /api/tasks/{id} | Update an existing task |
| DELETE | /api/tasks/{id} | Delete a task           |

> 📌 **Note**: All `/api/tasks/**` endpoints require an `Authorization` header with a valid JWT token:
