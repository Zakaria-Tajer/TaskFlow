# 📝 TaskFlow - Task Management API

A RESTful backend API for managing tasks with secure user authentication. Built with Java Spring Boot, JWT-based security, Docker Compose, and Input validation.

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
  - Task status enum (e.g., `PENDING`, `IN_PROGRESS`, `COMPLETED`)
  - Input validation with meaningful error messages

- 🐳 **Dockerized Setup**

  - Docker Compose for backend and PostgreSQL

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

```bash
# Clone the repo
git clone https://github.com/your-username/taskflow.git
cd taskflow

# Build the project
./mvnw clean install

# Run with Docker
docker-compose up --build

```
