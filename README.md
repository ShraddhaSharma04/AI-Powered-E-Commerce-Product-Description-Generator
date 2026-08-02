# AI-Powered E-Commerce Product Description Generator

## Project Overview

**AI ProductGen** is a full-stack web application designed to help food-processing businesses create professional and engaging product descriptions for e-commerce platforms.

Users can enter product details such as product name, ingredients, weight, key features, and preferred tone. The application generates a product description that can be saved and managed through the dashboard.

---

## Live Deployment

### Frontend

**Vercel:**
https://ai-powered-e-commerce-product-descr-five.vercel.app

The React frontend is deployed using Vercel.

### Backend

**Render:**
https://ai-productgen-backend.onrender.com

The Node.js and Express.js backend is deployed using Render.

### Database

**MongoDB Atlas**

MongoDB Atlas is used as the cloud database for storing user accounts and saved product descriptions.

---

## Features

* User registration
* User login
* Google OAuth authentication
* Protected routes
* Product description generation
* Multiple product description tones
* Save product descriptions
* View saved product descriptions
* Edit product tone
* Delete product descriptions
* MongoDB Atlas integration
* REST API backend
* Responsive design
* Dark and light mode
* Input validation
* Password hashing
* JWT authentication
* Authentication rate limiting

---

## Technology Stack

### Frontend

* React.js
* Vite
* React Router
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Passport.js
* Google OAuth
* bcryptjs
* Express Validator
* Express Rate Limit

### Deployment

* **Vercel** — Frontend
* **Render** — Backend
* **MongoDB Atlas** — Database

---

## Project Structure

```text
AI-Powered-E-Commerce-Product-Description-Generator/
│
├── backend/
│   ├── config/
│   ├── Middleware/
│   ├── models/
│   ├── Routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── Context/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Main Application Pages

### Home

The Home page provides an introduction to AI ProductGen and explains the main purpose of the application.

### About

The About page provides information about the project and its purpose.

### Generator

The Generator page allows users to enter:

* Product name
* Ingredients
* Weight
* Key features
* Description tone

The user can then create and save a product description.

### Dashboard

The Dashboard displays product descriptions stored in MongoDB Atlas.

Users can:

* View saved descriptions
* Edit the tone
* Delete descriptions
* Refresh the saved product list

### Login and Registration

The application provides authentication using:

* Email and password
* Google OAuth

---

## Environment Variables

### Frontend

The frontend uses:

```env
VITE_API_URL=https://ai-productgen-backend.onrender.com
```

This allows the Vite application to communicate with the deployed backend.

### Backend

The backend uses the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url
FRONTEND_URL=your_frontend_url
```

> **Note:** Actual secret values are stored in the Vercel and Render environment variable dashboards and are not committed to GitHub.

---

## API Integration

The frontend communicates with the Express.js backend using REST APIs.

Example API routes include:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/auth/google
GET  /api/auth/google/callback
```

Product description functionality is handled through backend API routes and MongoDB.

---

## Database

The application uses **MongoDB Atlas** as its cloud database.

The database stores information such as:

* User accounts
* Product names
* Ingredients
* Weight
* Product features
* Selected tone
* Generated descriptions
* Timestamps

Mongoose is used in the backend to interact with MongoDB.

---

## Authentication and Security

The application includes several security mechanisms:

* Password hashing using bcryptjs
* JWT-based authentication
* Protected API routes
* Google OAuth authentication
* Input validation using Express Validator
* Authentication rate limiting
* Environment variables for sensitive credentials
* CORS configuration
* `.env` files excluded through `.gitignore`

---

## Deployment

### Frontend Deployment

The frontend is deployed on Vercel.

The Vercel project uses:

```text
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

The production frontend communicates with the Render backend through:

```env
VITE_API_URL
```

### Backend Deployment

The backend is deployed on Render.

Render uses:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

The backend is available at:

https://ai-productgen-backend.onrender.com

---

## Production Testing

The deployed application was tested to verify the following:

* [x] Frontend loads successfully
* [x] Backend is accessible
* [x] MongoDB Atlas connection works
* [x] User registration works
* [x] User login works
* [x] Dashboard loads
* [x] Saved descriptions are displayed
* [x] Product descriptions are stored in MongoDB
* [x] Product descriptions can be deleted
* [x] Product tone can be updated
* [x] Protected routes work
* [x] Frontend communicates with the deployed backend
* [x] Vercel deployment is successful
* [x] Render deployment is successful

---

## Known Limitations on Free Tier

* Render's free-tier service may sleep after a period of inactivity.
* The first request after the backend has been idle may take some time while the service starts.
* Free-tier deployment resources are limited.
* Google OAuth requires correctly configured production callback URLs.
* AI API usage may be limited by the API provider's quota.
* Free-tier services may have limited performance compared with paid hosting.

---

## Future Scope

The project can be improved further by adding:

* Improved AI-generated descriptions using Gemini API
* Advanced search and filtering
* Better form validation
* User profile management
* Role-based authentication
* Product analytics
* Product image generation
* Improved security
* Better error handling
* Production monitoring
* Custom domain
* Improved AI prompt engineering
* Deployment optimization

---

## Learning Outcomes

During the development and deployment of this project, I learned:

* How to build a full-stack application using React.js and Node.js
* How to create REST APIs using Express.js
* How to connect an application to MongoDB Atlas
* How to implement JWT authentication
* How to implement Google OAuth
* How to use environment variables
* How to deploy a React application on Vercel
* How to deploy a Node.js backend on Render
* How to debug deployment errors
* How to configure CORS for production
* How to connect a deployed frontend with a deployed backend
* How to test a full-stack application in a production environment

---

## Week 9 Deployment

This project was deployed as part of **Week 9 — App Deployment & Go-Live**.

### Deployment Deliverables

1. Live Public App URL
2. Deployment Documentation
3. Peer Testing Feedback
4. Deployment Screenshots PDF

### Live URLs

**Frontend:**
https://ai-powered-e-commerce-product-descr-five.vercel.app

**Backend:**
https://ai-productgen-backend.onrender.com

---

## Author

**Shraddha Sharma**

B.Tech Computer Science and Engineering
Graphic Era (Deemed to be University)

---

## License

This project was developed for educational and internship purposes.
