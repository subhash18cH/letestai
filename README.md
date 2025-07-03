# Bookstore REST API

A simple Bookstore REST API built using **Node.js**, **Express**, and **TypeScript**, with **JSON file-based persistence**. This API supports CRUD operations on books and includes authentication using JWT.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)

- [Running the Application](#running-the-application)
- [Testing Endpoints](#testing-endpoints)

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm**
- **Git**

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subhash18cH/letestai.git
   cd letestai
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Creat .env file**
   ```bash
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```
  

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The application will be running at `http://localhost:3000`

## Testing Endpoints - using Postman

### I. User Authentication
### 1. Register a User
**Endpoint:** `POST /api/register`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password":"john123"
}
```

**Response:**
```json
"user registered successfully"
```

---
### 2. Login a User
**Endpoint:** `GET /api/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password":"john123"
}
```

**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4YjIzNzE0LWIyNjUtNGQ1Ny04YzZiLTYxMzkzNTRkMWQzNCIsImVtYWlsIjoiY2FtYW5AZ21haWwuY29tIiwiaWF0IjoxNzUxNTA0MjU1LCJleHAiOjE3NTE1MDc4NTV9.sb69xyc_kLgmc3IKVM-Lb9VlNH857AFu5m4pCS4FjTg"
}
```
---
### II. Book Management 
### 1. List all books
**Endpoint:** `GET /api/books`

**Response:**
```json
[
    
    {
      "id": "fbcb51a0-f536-4cbc-98e9-b817eb332dac",
      "title": "Atomic Habits",
      "author": "James Clear",
      "genre": "Self-help",
      "publishedYear": 2018,
      "userId": "170714bf-4fbd-4c5a-a03f-5bd00e615878"
    },
    {
      "id": "82bd131a-f4da-45f0-8e1a-97291ac3d429",
      "title": "The Pragmatic Programmer",
      "author": "Andy Hunt & Dave Thomas",
      "genre": "Software Engineering",
      "publishedYear": 1999,
      "userId": "08b23714-b265-4d57-8c6b-6139354d1d34"
    },
    {
      "id": "cd9db136-1a19-4ac1-8db0-76a374925b93",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "genre": "Fiction",
      "publishedYear": 1960,
      "userId": "08b23714-b265-4d57-8c6b-6139354d1d34"
    }
]
```
---
### 2. Get book by ID 
**Endpoint:** `GET /api/books/{id}`

**Example:** `GET /api/books/67daa8286f4bb91454228f3c`

**Response:**
```json
{
    "id": "ad0b41eb-d07a-4907-9840-a7126484aced",
    "title": "A",
    "author": "A author",
    "genre": "A genre",
    "publishedYear": "A year",
    "userId": "170714bf-4fbd-4c5a-a03f-5bd00e615878"
}
```
---
### 3. Add a new book  
**Endpoint:** `POST /api/books`

**Request Body:**

```json
{
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "publishedYear": 1960
}
```

**Response:**
```json
{
    "id": "cd9db136-1a19-4ac1-8db0-76a374925b93",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "publishedYear": 1960,
    "userId": "08b23714-b265-4d57-8c6b-6139354d1d34"
}
```
---
### 4. Update a book by ID 
**Endpoint:** `PUT /api/books/{id}`

**Example:** `PUT /api/books/67daa8286f4bb91454228f3c`

**Request Body:**

```json
{
  "id":"fbcb51a0-f536-4cbc-98e9-b817eb332dac",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programming",
  "publishedYear": 2008,
  "userId":"170714bf-4fbd-4c5a-a03f-5bd00e615878",
}
```

**Response:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programming",
  "publishedYear": 2008
}
```

---
### 5. Delete a book by ID
**Endpoint:** `DELETE /api/books/{id}`

**Example:** `DELETE /api/books/67daa8286f4bb91454228f3c`

**Response:**
```json
{
    "message": "Book deleted"
}
```

## Author
Created by **Subhash Chand**