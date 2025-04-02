# Horror Movie List Website

A full-stack horror movie listing website built with **NestJS** for the backend and **React with TypeScript (TSX)** for the frontend.

## Features

- **NestJS Backend** with PostgreSQL database
- **React & Redux Frontend**
- **JWT Authentication**
- **Prisma ORM for Database Management**
- **Neon Console for PostgreSQL Hosting**

---

## Getting Started

### Backend Setup (NestJS)

1. Install dependencies:

   ```sh
   cd nestjs-back
   npm install
   ```

2. Create a `.env` file in the **nestjs-back** main directory and add the required environment variables.

   - Generate a JWT secret key from **[jwtsecret.com](https://jwtsecret.com/generate)**
   - Create a **[Neon Serverless Postgres](https://neon.tech)** account or log in with GitHub
   - Create a new PostgreSQL **(version 17)** project
   - Specify the database name and region
   - Get the connection details and add them to your `.env` file
   - Your `.env` file should look like this:
     
   ```sh
   DATABASE_URL="your database url that you got from Neon Console"
   JWT_SECRET="your jwt secret token"
   ```

3. Setup Prisma ORM:

   ```sh
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start the NestJS server in development mode:

   ```sh
   npm run start:dev
   ```

### Frontend Setup (React + TSX)

1. Install dependencies:

   ```sh
   cd tsx-react-front
   npm install
   ```

2. Start the React development server:

   ```sh
   npm run dev
   ```

---

## Common Issues & Solutions

- If port **5173** is unavailable, change the backend port in:
  - **/nestjs-back/main.ts**
- Or simply kill the existing port using
  ```sh
   netstat -ano | findstr :<PORT>
   taskkill /PID <PID> /F
  ```

---
