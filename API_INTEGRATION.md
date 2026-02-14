# API Integration Guide for Devlance

This document provides details on integrating Devlance with a backend API.

## Overview

Devlance is structured to work with a RESTful API backend. The frontend includes:

- Centralized API client configuration
- Automatic JWT token management
- Service layer for all API calls
- Mock data fallback for development

## API Configuration

### Base URL Setup

Set your API base URL in the `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Axios Configuration

The app uses a configured Axios instance (`src/services/api.js`) that:

1. **Adds JWT tokens automatically** to all requests
2. **Handles authentication errors** (401) by logging out and redirecting
3. **Provides centralized error handling** for common HTTP errors

## Required Backend Endpoints

### Authentication Endpoints

#### 1. Initiate Google OAuth

```
POST /auth/google
Response: Redirect to Google OAuth consent screen
```

#### 2. OAuth Callback

```
POST /auth/google/callback
Body: { code: string }
Response: {
  token: string,
  user: {
    id: string,
    name: string,
    email: string,
    avatar: string,
    skills: string[],
    bio: string,
    github?: string,
    linkedin?: string,
    portfolio?: string
  }
}
```

#### 3. Get Current User

```
GET /auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { user: UserObject }
```

#### 4. Logout

```
POST /auth/logout
Headers: { Authorization: "Bearer <token>" }
Response: { message: string }
```

#### 5. Refresh Token

```
POST /auth/refresh
Headers: { Authorization: "Bearer <token>" }
Response: { token: string }
```

### Developer Endpoints

#### 1. Get All Developers

```
GET /developers?search=<query>&skills=<skills>
Headers: { Authorization: "Bearer <token>" }
Response: [
  {
    id: string,
    name: string,
    email: string,
    avatar: string,
    bio: string,
    location?: string,
    skills: string[],
    github?: string,
    linkedin?: string,
    portfolio?: string
  }
]
```

#### 2. Get Developer by ID

```
GET /developers/:id
Headers: { Authorization: "Bearer <token>" }
Response: { developer: DeveloperObject }
```

#### 3. Update Profile

```
PUT /developers/profile
Headers: { Authorization: "Bearer <token>" }
Body: {
  name: string,
  bio: string,
  skills: string[],
  github?: string,
  linkedin?: string,
  portfolio?: string
}
Response: { user: UpdatedUserObject }
```

#### 4. Send Connection Request

```
POST /developers/connect
Headers: { Authorization: "Bearer <token>" }
Body: {
  developerId: string,
  message: string
}
Response: {
  request: {
    id: string,
    status: "pending",
    message: string,
    createdAt: string
  }
}
```

#### 5. Get Received Requests

```
GET /developers/requests/received
Headers: { Authorization: "Bearer <token>" }
Response: [
  {
    id: string,
    from: string,
    avatar: string,
    message: string,
    date: string,
    status: "pending" | "accepted" | "declined"
  }
]
```

#### 6. Get Sent Requests

```
GET /developers/requests/sent
Headers: { Authorization: "Bearer <token>" }
Response: [
  {
    id: string,
    to: string,
    avatar: string,
    message: string,
    date: string,
    status: "pending" | "accepted" | "declined"
  }
]
```

#### 7. Accept Request

```
PUT /developers/requests/:id/accept
Headers: { Authorization: "Bearer <token>" }
Response: { message: string, request: UpdatedRequestObject }
```

#### 8. Decline Request

```
PUT /developers/requests/:id/decline
Headers: { Authorization: "Bearer <token>" }
Response: { message: string, request: UpdatedRequestObject }
```

#### 9. Get Connections

```
GET /developers/connections
Headers: { Authorization: "Bearer <token>" }
Response: [{ id: string, name: string, ... }]
```

## JWT Token Structure

Your backend should issue JWT tokens with the following claims:

```json
{
  "userId": "string",
  "email": "string",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## Error Response Format

All errors should follow this format:

```json
{
  "error": true,
  "message": "Error description",
  "statusCode": 400
}
```

## CORS Configuration

Your backend must allow requests from the frontend origin:

```javascript
// Example Express.js CORS config
app.use(
  cors({
    origin: "http://localhost:5174", // Update for production
    credentials: true,
  }),
);
```

## Google OAuth Setup

### Backend Setup

1. **Create Google OAuth credentials**:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

2. **Store credentials** securely in environment variables:

   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   ```

3. **Implement OAuth flow**:
   - `/auth/google`: Redirect to Google OAuth consent
   - `/auth/google/callback`: Exchange code for token, create/update user, return JWT

### Frontend Configuration

Update `src/services/authService.js` for production:

```javascript
initiateGoogleLogin: () => {
  // Redirect to backend OAuth endpoint
  window.location.href = `${API_BASE_URL}/auth/google`;
};
```

## Development Mode (Mock Data)

During development without a backend, the app uses mock data:

- **Authentication**: Returns mock user and token after 1 second
- **Developers**: Shows hardcoded list of developers
- **Requests**: Displays sample collaboration requests

To switch to real API:

1. Set `VITE_API_URL` in `.env`
2. Remove mock data from components
3. Update `authService.js` OAuth methods

## Testing API Integration

### Using cURL

Test authentication:

```bash
curl -X POST http://localhost:5000/api/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{"code": "google-auth-code"}'
```

Test protected endpoint:

```bash
curl http://localhost:5000/api/developers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Set up environment variables for base URL and token
3. Test each endpoint with sample data

## Security Considerations

1. **HTTPS Only**: Use HTTPS in production
2. **Token Expiration**: Implement token refresh logic
3. **Rate Limiting**: Add rate limiting on backend
4. **Input Validation**: Validate all inputs on backend
5. **SQL Injection**: Use parameterized queries
6. **XSS Protection**: Sanitize user inputs

## Deployment Checklist

- [ ] Update `VITE_API_URL` to production API URL
- [ ] Set up CORS to allow production domain
- [ ] Configure Google OAuth redirect URIs for production
- [ ] Enable HTTPS
- [ ] Set up environment variables on hosting platform
- [ ] Test all API endpoints in production
- [ ] Monitor error logs
- [ ] Set up API rate limiting

## Example Backend Implementation

See `BACKEND_EXAMPLE.md` for a complete Node.js/Express backend example with MongoDB.

## Troubleshooting

### Token Not Attached to Requests

- Check if token is stored in localStorage: `localStorage.getItem('token')`
- Verify Axios interceptor is configured correctly
- Check browser console for errors

### CORS Errors

- Ensure backend CORS is configured for your frontend domain
- Check that credentials are included in requests

### 401 Unauthorized

- Token may be expired
- Token may be invalid
- Backend may not be validating token correctly

### API Not Responding

- Check if backend server is running
- Verify `VITE_API_URL` is correct
- Check network tab in browser DevTools

## Support

For issues or questions:

1. Check existing GitHub issues
2. Review API logs
3. Test endpoints with Postman/cURL
4. Create a new GitHub issue with details

---

**Happy coding! 🚀**
