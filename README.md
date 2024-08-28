# Kasuwan Gwari Global

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Admin Dashboard](#admin-dashboard)
8. [API Documentation](#api-documentation)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction
The Agro Commerce Merchant-to-Customer Interface App is designed to connect customers directly with agricultural merchants. The app enables customers to browse, filter, and purchase a variety of agricultural products from different merchants. The app also includes an admin dashboard for managing merchants, products, orders, and users.

## Features
- **Customer Interface**:
  - Browse products by category, location, and merchant.
  - Filter products by cluster of produce.
  - Integrated payment gateway (PaystackStripe) for secure transactions.
  - User account management for customers.

- **Merchant Interface**:
  - Manage product listings.
  - View and manage orders.
  - Track payment and transaction history.

- **Admin Dashboard**:
  - Manage merchants, products, and orders.
  - User management for customers and merchants.
  - View transaction reports and analytics.

## Technology Stack
- **Frontend**:
  - [Flutter](https://flutter.dev) for the mobile app (Customer and Merchant interfaces).
  
- **Backend**:
  - [Node.js](https://nodejs.org) with [Express](https://expressjs.com) for the RESTful API.
  - [PostgreSQL](https://www.postgresql.org) as the relational database.
  - [Prisma](https://www.prisma.io) as the ORM for interacting with PostgreSQL.
  
- **Admin Dashboard**:
  - Built with [React.js](https://reactjs.org) and [Nextjs](https://Nextjs.com).
  
- **Payment Integration**:
  - [Paystack](https://paystack.com/docs/api) for handling payments.

## Installation
### Prerequisites
- Flutter SDK
- Node.js
- PostgreSQL
- Yarn or npm

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/goodychama/kasuwa.git
   cd agro-commerce-app
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   flutter pub get
   ```

4. **Install Admin Dashboard Dependencies:**
   ```bash
   cd ../admin-dashboard
   npm install
   ```

## Configuration
1. **Backend Configuration:**
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=5000
     DATABASE_URL=postgresql://username:password@localhost:5432/agro-commerce
     PAYSTACK_SECRET_KEY=your_paystack_secret_key
     ```

   - Initialize Prisma:
     ```bash
     npx prisma migrate dev --name init
     npx prisma generate
     ```

2. **Frontend Configuration:**
   - Update `lib/config.dart` in the Flutter project with the backend API URL and other necessary keys.

3. **Admin Dashboard Configuration:**
   - Create a `.env` file in the `admin-dashboard` directory with:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```

## Usage
### Running the Backend
```bash
cd backend
npm start
```

### Running the Frontend (Flutter)
```bash
cd frontend
flutter run
```

### Running the Admin Dashboard
```bash
cd admin-dashboard
npm start
```

## Admin Dashboard
The admin dashboard allows you to manage all aspects of the application including merchants, products, users, and orders. Accessible at `http://localhost:3000` after running the admin dashboard.

### Features:
- **Dashboard Overview**: A summary of key metrics.
- **Merchant Management**: Add, update, or remove merchants.
- **Product Management**: Manage product listings.
- **Order Management**: View and manage customer orders.
- **User Management**: Manage user accounts.
- **Reports & Analytics**: View transaction reports and other analytics.

## API Documentation
API documentation is available at.....

.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

