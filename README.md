# Devlance - Freelancing Platform (Frontend Only)

A freelancing platform frontend built with React and Tailwind CSS. This is a client-side only application with mock authentication and data management.

## Project Structure

```
devlance/
└── client/                 # Frontend (React + Vite)
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   │   ├── auth/       # Authentication pages
    │   │   ├── client/     # Client dashboard pages
    │   │   ├── freelancer/ # Freelancer dashboard pages
    │   │   └── admin/      # Admin dashboard pages
    │   ├── context/        # React Context for global state
    │   └── utils/          # Utility functions
    └── public/
```

## Features

### Client Features

- Post jobs
- View proposals from freelancers
- Manage active projects
- Dashboard overview

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

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- LocalStorage for state persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd devlance
```

2. Install client dependencies

```bash
cd client
npm install
```

### Running the Application

Start the development server:

```bash
cd client
npm run dev
```

The application will run on `http://localhost:5173`.

## Authentication

This is a frontend-only application with mock authentication. When you log in or register:

- User data is stored in browser's LocalStorage
- No actual password validation is performed
- You can select your role (Client/Freelancer) during registration

## User Roles

- **Client**: Can post jobs and manage projects
- **Freelancer**: Can browse jobs and submit proposals
- **Admin**: Platform management access

## Development

The application uses mock data and local state management. To add backend functionality:

1. Set up your backend API
2. Create service files in `src/services/` directory
3. Update authentication logic in `src/context/AuthContext.jsx`
4. Connect forms and data fetching to your API endpoints

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
