# Devlance - Freelancing Platform

A full-stack freelancing platform built with React (frontend) and Node.js/Express (backend).

## Project Structure

```
devlance/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   │   ├── auth/       # Authentication pages
│   │   │   ├── client/     # Client dashboard pages
│   │   │   ├── freelancer/ # Freelancer dashboard pages
│   │   │   └── admin/      # Admin dashboard pages
│   │   ├── context/        # React Context for global state
│   │   ├── services/       # API service calls
│   │   └── utils/          # Utility functions
│   └── public/
│
└── server/                 # Backend (Node.js + Express)
    ├── config/             # Configuration files
    ├── models/             # MongoDB models
    ├── controllers/        # Request handlers
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    └── utils/              # Utility functions
```

## Features

### Client Features

- Post jobs
- View proposals from freelancers
- Manage active projects
- Payment management

### Freelancer Features

- Browse available jobs
- Submit proposals
- Manage projects
- Profile management

### Admin Features

- User management
- Job moderation
- Reports and analytics
- Platform statistics

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd devlance
```

2. Install server dependencies

```bash
cd server
npm install
```

3. Install client dependencies

```bash
cd ../client
npm install
```

4. Configure environment variables
   Create a `.env` file in the root directory:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/devlance
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### Running the Application

1. Start MongoDB

```bash
mongod
```

2. Start the server (from server directory)

```bash
cd server
npm run dev
```

3. Start the client (from client directory)

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` and the server on `http://localhost:5000`.

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Jobs

- POST `/api/jobs` - Create new job (Client only)
- GET `/api/jobs` - Get all jobs
- GET `/api/jobs/:id` - Get job by ID
- PUT `/api/jobs/:id` - Update job (Client only)
- DELETE `/api/jobs/:id` - Delete job (Client only)

### Proposals

- POST `/api/proposals` - Submit proposal (Freelancer only)
- GET `/api/proposals/my` - Get freelancer's proposals
- GET `/api/proposals/job/:jobId` - Get proposals for a job

### Projects

- POST `/api/projects` - Create project
- GET `/api/projects/my` - Get user's projects
- GET `/api/projects/:id` - Get project by ID
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Admin

- GET `/api/admin/users` - Get all users (Admin only)
- GET `/api/admin/stats` - Get dashboard statistics (Admin only)

## User Roles

- **Client**: Can post jobs and hire freelancers
- **Freelancer**: Can browse jobs and submit proposals
- **Admin**: Full platform access and management

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
