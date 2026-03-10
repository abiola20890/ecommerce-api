# 🛒 Ecommerce Catalog API

A RESTful API for managing an e-commerce product catalog with authentication, subscriber notifications, and admin controls — built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- **Product Management** — Create, read, update, and delete products with image management, stock control, filtering, sorting, and pagination
- **Authentication** — JWT-based auth with role-based access control (user/admin)
- **Subscriber System** — Email subscriptions with welcome emails and new product notifications
- **Admin Controls** — Send promotional emails to all subscribers
- **Input Validation** — Joi validation on all endpoints
- **Error Handling** — Centralized error handling with meaningful messages
- **Request Logging** — HTTP request logger with response time tracking

---

## 🧰 Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB with Mongoose
- **Authentication** — JSON Web Tokens (JWT)
- **Validation** — Joi
- **Email** — Nodemailer with Gmail SMTP
- **Password Hashing** — bcryptjs

---

## 📁 Project Structure

```
src/
├── controllers/
│   ├── auth.controller.js
│   ├── product.controller.js
│   ├── productImage.controller.js
│   ├── subscriber.controller.js
│   └── admin.controller.js
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   └── subscriber.model.js
├── routes/
│   ├── auth.routes.js
│   ├── product.routes.js
│   ├── subscriber.routes.js
│   └── admin.routes.js
├── middleware/
│   ├── auth.middleware.js
│   ├── errorHandler.js
│   └── logger.js
├── services/
│   ├── product.service.js
│   └── email.service.js
├── validations/
│   ├── authValidation.js
│   ├── productValidation.js
│   └── productStockSchema.js
├── utils/
│   ├── bcrypt.js
│   ├── categoryHelper.js
│   ├── handleError.js
│   ├── pagination.js
│   ├── queryHelper.js
│   └── validateRequest.js
|   
└── app.js
index.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- G Mail account (for emails)

### Installation

```bash
# Clone the repository
git clone https://github.com/abiola20890/ecommerce-api.git

# Navigate into the project
cd ecommerce-api

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
PORT=your port number
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email (Gmail)
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_password
EMAIL_FROM_NAME=Your Store Name
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/me` | Protected | Get current user |

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get product by ID |
| POST | `/api/products` | Admin | Create a product |
| PUT | `/api/products/:id` | Admin | Update a product |
| DELETE | `/api/products/:id` | Admin | Delete a product |
| PATCH | `/api/products/:id/stock` | Admin | Update stock status |
| POST | `/api/products/:id/images` | Admin | Add images |
| DELETE | `/api/products/:id/images` | Admin | Remove images |

### Subscribers

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/subscribers` | Public | Subscribe with email |
| GET | `/api/subscribers` | Admin | Get all subscribers |

### Admin

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/promotions` | Admin | Send promotional email |

---

## 🔐 Authentication

This API uses **JWT Bearer tokens**. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

To get a token, register or login. Admin routes require a user with `role: "admin"`.

---

## 📦 Query Parameters

The `GET /api/products` endpoint supports the following query parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `sortBy` | string | Field to sort by (default: createdAt) |
| `order` | string | `asc` or `desc` (default: desc) |
| `category` | string | Filter by category |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `q` | string | Full-text search |
| `name` | string | Filter by name |

---

## 📧 Email Notifications

Emails are automatically sent when:
- A user **subscribes** — welcome email
- A new **product is created** — notification to all subscribers
- An **admin sends a promotion** — custom email to all subscribers

---

## 🛡️ Error Responses

All errors follow this format:

```json
{
    "success": false,
    "message": "Error message here"
}
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad request / Validation error |
| 401 | Unauthorized |
| 403 | Forbidden (Admin only) |
| 404 | Resource not found |
| 409 | Conflict (duplicate) |
| 500 | Internal server error |

---

## 👤 Author

**Ibilola Abiola** — Built as a standalone ecommerce backend project.

---

## 📮 API Documentation
Full interactive API documentation available on Postman:

[👉 View API Documentation](https://documenter.getpostman.com/view/50244835/2sBXcKCdug)

## 📝 Changelog

### v1.0.0
- Product CRUD with images, stock management, filtering, sorting and pagination
- JWT authentication with role-based access control (user/admin)
- Subscriber system with welcome emails and new product notifications
- Admin promotional email system
- Centralized error handling and request logging

### v2.0.0 (Coming Soon)
- Password reset via email
- Order management system
- Refresh tokens
- Multer - to handle file upload
- cloudinary or AWS - to store the image
- Return the image URL and save it to the product
