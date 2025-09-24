# Frontend - React Dashboard with Authentication

A modern React TypeScript application with JWT authentication, built with Vite and Tailwind CSS.

## Features

- 🔐 **JWT Authentication** - Secure login and registration
- 📊 **Dashboard** - User profile and blog management
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔒 **Protected Routes** - Authentication required for dashboard access
- 📱 **Responsive** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Login form
│   ├── Register.tsx    # Registration form
│   └── Dashboard.tsx   # Main dashboard
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── services/           # API services
│   └── api.ts          # Backend API integration
├── App.tsx             # Main app component with routing
└── main.tsx            # App entry point
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints (require JWT token)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/blogs` - Get all blogs (public)
- `POST /api/blogs` - Create new blog (protected)
- `PUT /api/blogs/:id` - Update blog (protected)
- `DELETE /api/blogs/:id` - Delete blog (protected)

## Authentication Flow

1. **Login/Register** - Users authenticate via the login/register forms
2. **JWT Token** - Server returns a JWT token stored in localStorage
3. **Protected Routes** - Dashboard requires valid JWT token
4. **Auto-redirect** - Unauthenticated users are redirected to login
5. **Token Expiry** - Expired tokens automatically log out users

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication

## Backend Integration

This frontend is designed to work with the Node.js/Express backend that provides:

- User authentication with JWT
- Profile management
- Blog CRUD operations
- Protected API routes

Make sure the backend server is running on port 5000 before starting the frontend.
