# Grocery MERN App

## Project Description
This is a full-stack Grocery application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse grocery products by categories, manage their cart, and place orders. Sellers can add and manage products. The app features user authentication and role-based access control.

## Features
- User registration and login with simplified authentication
- Browse products by categories
- Search products by name
- Add products to cart and manage cart items
- Seller dashboard to add, update, and manage products
- Responsive UI for desktop and mobile
- RESTful API backend with Express.js and MongoDB
- Image upload support for products
- Secure authentication middleware

## Technologies Used
- Frontend: React, React Router, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: Custom header-based auth (no JWT)
- Image Upload: Multer
- State Management: React Context API
- Development Tools: Nodemon, Axios, React Hot Toast

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory with the following variable:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints Overview

### User Routes
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/is-auth` - Check user authentication status
- `GET /api/user/logout` - Logout user

### Seller Routes
- `POST /api/seller/register` - Register a new seller
- `POST /api/seller/login` - Login seller
- `GET /api/seller/is-auth` - Check seller authentication status

### Product Routes
- `POST /api/product/add-product` - Add a new product (seller only)
- `GET /api/product/list` - Get list of products (supports category and search filters)
- `GET /api/product/id` - Get product by ID
- `POST /api/product/stock` - Update product stock (seller only)

### Category Routes
- `POST /api/category/add` - Add a new category
- `GET /api/category/get` - Get all categories
- `POST /api/category/update` - Update category
- `POST /api/category/delete` - Delete category

## Authentication
- Authentication is handled via a custom header `x-user-id` for users and sellers.
- No JWT tokens are used.
- Protected routes require the `x-user-id` header to be set with the authenticated user's or seller's ID.

## Testing
- Use the provided `test-auth.js` script for basic authentication tests.
- Manual testing can be done by running the frontend and backend servers and interacting with the UI.
- API endpoints can be tested using tools like Postman or Curl.

## Notes
- Ensure MongoDB is running before starting the backend.
- Image uploads are handled via Multer middleware.
- The frontend uses React Context API for state management.

## Author
Developed by Malik

## License
This project is licensed under the MIT License.
