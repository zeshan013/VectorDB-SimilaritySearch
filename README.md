# 🚀 Similarity Search with pgvector + Swagger UI (Dockerized)

This project demonstrates how to implement **vector similarity search** using **PostgreSQL with pgvector extension**.  
The entire setup is **dockerized** and includes a REST API with **Swagger UI** for testing.

## 📌 Features
- ✅ PostgreSQL with **pgvector** extension  
- ✅ Dockerized setup for easy deployment  
- ✅ REST API with **Swagger UI**  
- ✅ Raw SQL queries for similarity search  
- ✅ Example dataset included  

---

## 🛠️ Requirements
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/install/) installed
- GitHub project cloned locally


## 📂 Project Structure
- ├── docker-compose.yml # Docker services (Postgres + App)\n
- ├── app/ # Node.js/Express (or your API implementation)
- │ ├── controllers/
- │ ├── models/
- │ ├── routes/
- │ ├── swagger/ # Swagger UI setup
- │ └── ...
- └── README.md # This file

**Start services with Docker**
- docker-compose up -d
- PostgreSQL with pgvector will start on port 5432.
- API service (with Swagger UI) will start on port 3000.
