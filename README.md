# Devlance - Developer Collaboration Platform

A modern developer collaboration platform where developers can sign in using Google OAuth, create personal profiles, list technical skills, and connect with other developers based on project requirements.

## 🚀 Features

### Authentication

- Google OAuth login with JWT token management
- Secure token storage and automatic attachment to API requests
- Protected routes with authentication checks
- Persistent login state across sessions

### Developer Profiles

- Complete profile management (name, bio, skills, links)
- Avatar display
- GitHub, LinkedIn, and Portfolio links
- Real-time profile updates

### Developer Discovery

- Browse all developers in a responsive grid
- Search by name or bio
- Filter by skills
- View detailed developer information

### Collaboration System

- Send connection requests to other developers
- Manage incoming and outgoing requests
- Accept or decline collaboration requests
- Real-time request status updates

### Dashboard

- Quick statistics overview
- Recent activity feed
- Quick action buttons
- Personalized welcome screen

## 🛠️ Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **State Management**: Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/devlance.git
   cd devlance
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API URL:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
devlance/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   │   ├── GoogleLogin.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── common/            # Reusable components
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── SuccessMessage.jsx
│   │   ├── developers/        # Developer-related components
│   │   │   └── DeveloperCard.jsx
│   │   └── layout/            # Layout components
│   │       └── Header.jsx
│   ├── contexts/              # React Context providers
│   │   └── AuthContext.jsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useDevelopers.js
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Developers.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── Requests.jsx
│   ├── services/              # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── developerService.js
│   ├── utils/                 # Utility functions
│   │   └── helpers.js
│   ├── App.jsx               # Main App component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### API Integration

The app uses a centralized Axios instance configured in `src/services/api.js`:

- Automatically attaches JWT tokens to requests
- Handles 401 (unauthorized) responses by redirecting to login
- Provides global error handling

To connect to your backend API:

1. Update `VITE_API_URL` in your `.env` file
2. Ensure your backend provides these endpoints:
   - `POST /auth/google` - Google OAuth initiation
   - `POST /auth/google/callback` - OAuth callback handler
   - `POST /auth/logout` - Logout
   - `GET /auth/me` - Get current user
   - `GET /developers` - Get all developers
   - `PUT /developers/profile` - Update profile
   - `POST /developers/connect` - Send connection request
   - `GET /developers/requests/received` - Get received requests
   - `GET /developers/requests/sent` - Get sent requests
   - `PUT /developers/requests/:id/accept` - Accept request
   - `PUT /developers/requests/:id/decline` - Decline request

### Mock Data

For development without a backend, the app includes mock data that simulates API responses. This allows you to:

- Test the UI and interactions
- Develop features independently
- See the app in action immediately

## 🎨 Customization

### Styling

The app uses Tailwind CSS with a dark theme. Key colors:

- **Background**: `#0a0a0a` (black)
- **Primary**: `#00d4ff` (cyan)
- **Text**: `#ffffff` (white)
- **Secondary**: `#4b5563` (gray)

Customize colors in `src/index.css` or individual components.

### Adding Features

1. **New Page**: Create in `src/pages/` and add route in `App.jsx`
2. **New API Endpoint**: Add method in appropriate service file
3. **New Component**: Create in relevant `src/components/` subdirectory
4. **New Hook**: Add custom hook in `src/hooks/`

## 🔐 Authentication Flow

1. User clicks "Continue with Google"
2. App redirects to Google OAuth (or uses mock in development)
3. Backend validates OAuth code and returns JWT token
4. Token stored in localStorage
5. Token automatically attached to all API requests via Axios interceptor
6. Protected routes check for valid token before rendering

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Development Mode

In development, the app uses mock authentication:

- Google login button triggers mock OAuth flow
- Returns a mock JWT token and user data
- Allows testing without backend setup

For production, update `src/services/authService.js` to use real OAuth endpoints.

## 📝 Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🚢 Deployment

1. Build the app:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

3. Set environment variables on your hosting platform:
   - `VITE_API_URL`: Your production API URL
   - `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing fast build tool

---

**Built with ❤️ for the developer community**
