# Astrology Website Backend

This is the backend API for the Astrology website, built with Node.js, Express, and MongoDB Atlas.

## Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb+srv://your-mongodb-connection-string
PORT=5000
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users` | Register a new user | Public |
| POST | `/api/users/login` | Authenticate user & get token | Public |
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update user profile | Private |
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create a product | Admin |
| PUT | `/api/products/:id` | Update a product | Admin |
| DELETE | `/api/products/:id` | Delete a product | Admin |
| POST | `/api/products/:id/reviews` | Create product review | Private |
| GET | `/api/products/top` | Get top products | Public |
| GET | `/api/products/featured` | Get featured products | Public |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create new order | Private |
| GET | `/api/orders/myorders` | Get logged in user orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| PUT | `/api/orders/:id/pay` | Update order to paid | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/deliver` | Update order to delivered | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

## Database Models

- **User**: Authentication and profile data
- **Product**: Astrology products/services for purchase
- **Order**: Transaction records for purchases
- **Booking**: Consultation appointments (coming soon)
- **Blog**: Content management (coming soon)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the token in the request header:

```
Authorization: Bearer YOUR_TOKEN
```

## Feature Roadmap

- [ ] Add booking system for astrologer consultations
- [ ] Implement blog and content management
- [ ] Add astrology chart generation API
- [ ] Integrate payment gateway (PayPal, Stripe)
- [ ] Email notifications for orders and bookings
