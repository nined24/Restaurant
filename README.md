# Gustoso - QR-Based Restaurant Management System

A comprehensive restaurant management system with QR code scanning, role-based authentication, and real-time order tracking.

## Features

### Customer Features
- **Role-based Login**: Secure authentication with JWT tokens
- **QR Code Scanning**: Scan table QR codes to access digital menu
- **Digital Menu**: Browse menu items by category with mobile-first responsive design
- **Shopping Cart**: Add items to cart and manage quantities
- **Order Placement**: Place orders with special instructions
- **Live Order Tracking**: Real-time order status updates (Received → Preparing → Ready → Served)
- **Payment Processing**: Secure payment integration with multiple payment methods
- **Feedback System**: Submit ratings and comments after order completion

### Kitchen Staff Features
- **Dashboard**: View all incoming orders
- **Order Status Management**: Update order status through the lifecycle
- **Real-time Updates**: See new orders as they come in
- **Order Filtering**: Filter orders by status

### Manager Features
- **Menu Management**: Add, edit, hide/show menu items
- **Order Monitoring**: View all orders and their statuses
- **Payment Tracking**: Monitor all payment transactions
- **Inventory Management**: Track inventory levels and low-stock alerts
- **Table Management**: Manage restaurant tables

## Tech Stack

### Backend
- **Spring Boot 3.5.7**: Java 17
- **MongoDB**: NoSQL database
- **Spring Security**: Authentication and authorization
- **JWT**: Token-based authentication
- **Maven**: Dependency management

### Frontend
- **React 19**: UI framework
- **React Router**: Navigation
- **Axios**: HTTP client
- **QR Scanner**: QR code scanning library
- **React Toastify**: Notifications

## Prerequisites

- Java 17 or higher
- Maven (or use Maven Wrapper)
- Node.js 16+ and npm
- MongoDB running on localhost:27017

## Installation & Setup

### 1. Clone the repository
```bash
cd restaurant
```

### 2. Start MongoDB
Make sure MongoDB is running on `localhost:27017`

### 3. Backend Setup
```bash
# Install dependencies (if needed)
./mvnw.cmd clean install

# Run the Spring Boot application
./mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup
```bash
cd restaurant
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Default Credentials

### Customer
- Username: `customer`
- Password: `customer123`
- Role: `CUSTOMER`

### Kitchen Staff
- Username: `kitchen`
- Password: `kitchen123`
- Role: `KITCHEN_STAFF`

### Manager
- Username: `manager`
- Password: `manager123`
- Role: `MANAGER`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Public
- `POST /api/public/scan-qr` - Scan QR code to get table info

### Customer
- `GET /api/customer/menu` - Get all menu items
- `GET /api/customer/menu/categories` - Get all categories
- `POST /api/customer/order` - Place order
- `GET /api/customer/orders` - Get customer orders
- `GET /api/customer/order/{id}` - Get order details
- `POST /api/customer/payment` - Process payment
- `POST /api/customer/feedback` - Submit feedback

### Kitchen Staff
- `GET /api/kitchen/orders` - Get all orders
- `GET /api/kitchen/orders/status/{status}` - Get orders by status
- `PUT /api/kitchen/order/{id}/status` - Update order status

### Manager
- `GET /api/manager/menu` - Get all menu items
- `POST /api/manager/menu` - Create menu item
- `PUT /api/manager/menu/{id}` - Update menu item
- `DELETE /api/manager/menu/{id}` - Delete menu item
- `GET /api/manager/orders` - Get all orders
- `GET /api/manager/payments` - Get all payments
- `GET /api/manager/inventory` - Get inventory
- `GET /api/manager/inventory/low-stock` - Get low stock items

## Project Structure

```
restaurant/
├── src/main/java/com/example/restaurant/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── dto/             # Data Transfer Objects
│   ├── model/           # MongoDB entities
│   ├── repository/      # MongoDB repositories
│   ├── security/        # Security configuration
│   ├── service/         # Business logic
│   └── util/            # Utility classes
├── restaurant/          # React frontend
│   └── src/
│       ├── components/  # React components
│       ├── context/     # React context providers
│       ├── pages/       # Page components
│       └── utils/       # Utility functions
└── pom.xml             # Maven configuration
```

## Usage Flow

### Customer Flow
1. Login as Customer
2. Scan QR code on table
3. Browse menu and add items to cart
4. Place order
5. Track order status in real-time
6. Complete payment when order is served
7. Submit feedback

### Kitchen Staff Flow
1. Login as Kitchen Staff
2. View incoming orders on dashboard
3. Update order status as food is prepared
4. Mark orders as ready when complete

### Manager Flow
1. Login as Manager
2. Monitor orders and payments
3. Manage menu items
4. Check inventory levels and low-stock alerts

## Development

### Running Tests
```bash
# Backend tests
./mvnw.cmd test

# Frontend tests
cd restaurant
npm test
```

### Building for Production
```bash
# Backend
./mvnw.cmd clean package

# Frontend
cd restaurant
npm run build
```

## Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password encryption using BCrypt
- Secure API endpoints with Spring Security
- CORS configuration for frontend-backend communication

## Notes

- The system automatically creates default users and sample data on first startup
- QR codes are generated automatically for tables
- Payment processing is simulated (integrate with actual payment gateway for production)
- Order status updates are polled every 5 seconds (consider WebSockets for production)

## License

This project is for demonstration purposes.

