# AI-Powered E-Commerce Product Description Generator

An AI-powered full-stack web application that helps food processing businesses generate professional, keyword-rich product descriptions for e-commerce platforms.

## Project Overview

This project is designed for food processing businesses like HimShakti that want to list their products on platforms such as Amazon, Flipkart, and other online marketplaces. Many small businesses have good quality products but lack proper content-writing support for creating attractive product descriptions.

The application allows users to enter product details such as product name, ingredients, weight, tone, and key features. The system helps generate and manage product descriptions for e-commerce use. In Week 4, the backend APIs were created using in-memory data. Database and AI integration will be added in upcoming weeks.

## Tech Stack

* Frontend: React JS
* Styling: Tailwind CSS
* Backend: Node.js + Express.js
* Database: MongoDB via Atlas
* AI API: Gemini API
* API Testing: Postman / Thunder Client
* Deployment: Vercel + Render

## Project Progress

### Week 1: Project Setup

* Created GitHub repository
* Added README.md and .gitignore
* Created frontend and backend folder structure
* Submitted project brief

### Week 2: Frontend Foundations

* Created React frontend using Vite
* Added Tailwind CSS
* Built reusable components: Navbar, Hero, Card, and Footer
* Created pages: Home, About, Generator, and Dashboard
* Tested frontend locally using Vite

### Week 3: UI/UX and Component Design

* Created Figma wireframes
* Added reusable UI components
* Added responsive layouts
* Added dark/light mode demo

### Week 4: Backend and API Development

* Created Express.js backend server
* Added REST API endpoints for product descriptions
* Used in-memory data for Week 4
* Tested APIs using Postman / Thunder Client
* Connected frontend Dashboard page to backend API
* Added loading and error handling on frontend

## Folder Structure

```text
AI-Powered-E-Commerce-Product-Description-Generator/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── README.md
└── .gitignore
```
How to Run Backend Locally

Follow these steps to run the backend server on your system.

1. Go to the backend folder
cd backend
2. Install backend dependencies
npm install
3. Create .env file

Create a .env file inside the backend folder and add:

PORT=5000
4. Start the backend server
npm run dev
5. Backend URL

The backend will run at:

http://localhost:5000
6. Test API

Open this URL in browser to check if the backend is working:

http://localhost:5000/api/health

Expected response:

{
  "success": true,
  "message": "Backend server is running successfully"
}
