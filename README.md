# Penus

A modern, full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Penus provides a clean, intuitive interface for writers to create, share, and manage their blog content with advanced features like authentication, commenting, liking, and content management.

## ✨ Features

### Core Features

- **User Authentication & Authorization**

  - Secure registration and login
  - Password reset functionality
  - JWT-based authentication
  - Protected routes for authenticated users

- **Blog Management**

  - Create, read, update, and delete blog posts
  - Rich text editing capabilities
  - Image upload and management with Cloudinary
  - Draft and publish functionality
  - SEO-friendly URLs with slugs

### Security Features

- Helmet.js for security headers
- Data sanitization against NoSQL injection
- XSS protection with DOMPurify
- Rate limiting and parameter pollution prevention
- Input validation and sanitization

## 🛠️ Tech Stack

### Backend

- **Node.js** with **Express.js** - Server framework
- **TypeScript** - Type safety and better development experience
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Cloudinary** - Image storage and optimization
- **Nodemailer** - Email functionality

### Frontend

- **React 18** with **TypeScript** - UI framework
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Development Tools

- **Vite** - Frontend build tool
- **ESLint** & **Prettier** - Code formatting and linting
- **Concurrently** - Run multiple commands
- **Nodemon** - Development server auto-restart

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary** account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rosahadi/penus
   cd penus
   ```

2. **Install dependencies**

   ```bash
   # Install both server and client dependencies
   cd server
   npm run install:all
   ```

3. **Environment Configuration**

   Create `.env` file in the `server` directory:

   ```env
    PORT=3000
    NODE_ENV=development
    CLIENT_URL=


    MONGO_DB_NAME=your_database_name
    MONGO_URI=mongodb+srv://username:password@your-cluster.mongodb.net

    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=30d
    JWT_COOKIE_EXPIRES_IN=30

    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_email_password
    EMAIL_HOST=smtp.your-email-provider.com
    EMAIL_PORT=587

    EMAIL_FROM=your_email

    GMAIL_USERNAME=your_gmail
    GMAIL_PASSWORD=gmail_app_password

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
   ```

4. **Database Setup**

- Ensure MongoDB is running locally, or
- Set up a MongoDB Atlas cluster and update the connection string

5. **Start the application**

```bash
# Development mode (runs both server and client)
npm run dev:start

# Or start separately:
# Server only
npm run dev

# Client only (in another terminal)
npm run start:frontend
```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🔧 Available Scripts

### Server Scripts

```bash
npm run dev              # Start development server
npm run start:prod       # Start production server
npm run build:server     # Build TypeScript
npm run test             # Run tests
npm run lint             # Run ESLint
```

### Client Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Combined Scripts

```bash
npm run dev:start        # Start both server and client in development
npm run prod:start       # Start both server and client in production
npm run build            # Build both server and client
```

## 🚀 Deployment

### Production Build

```bash
# Build the entire application
npm run build

# Start production server
npm run prod:start
```

## 🔒 Security Features

- **Authentication**: JWT-based with secure HTTP-only cookies
- **Authorization**: Protected routes and resource ownership checks
- **Input Validation**: Comprehensive validation with custom middleware
- **Data Sanitization**: Protection against XSS and NoSQL injection
- **Rate Limiting**: API endpoint protection
- **Security Headers**: Helmet.js implementation
- **File Upload Security**: Type and size restrictions
