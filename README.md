# 🚀 SwiftPay

SwiftPay is a full-stack digital wallet and personal finance application designed to simulate secure, seamless peer-to-peer fund transfers while providing deep insights into your financial health. Built with a robust MERN stack architecture, it features secure user authentication, atomic transactional integrity, transaction categorization, and an analytical dashboard for tracking income, expenses, and overall cash flow.

## 📖 Description

SwiftPay provides a simplified platform for managing digital transactions and tracking personal finances. Users can securely send money to other users, search for recipients, review transaction history, analyze spending patterns, and export financial records.

### ✨ Key Features

- **Secure Authentication:** JWT-based signup and signin with hashed password storage.
- **Atomic Transactions:** MongoDB transactions ensure money transfers are processed atomically.
- **Advanced Analytics Dashboard:**
  - Total balance and cash-flow statistics
  - Income vs. expenses
  - Categorical spending breakdown
  - Quick stats for total received, total sent, and net cash flow
- **Transaction Management:** View and analyze historical transactions with categories and counterparties.
- **Data Export:** Export transaction history as CSV or JSON.
- **User Search:** Search users by first name, last name, or username to find transfer recipients.
- **Responsive UI:** Modern interface styled with Tailwind CSS.

## 🧭 Table of Contents

- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Installation](#️-installation)
- [▶️ Usage](#️-usage)
- [💡 Usage Examples](#-usage-examples)
- [📂 Project Structure](#-project-structure)
- [🔌 API Documentation](#-api-documentation)
  - [👤 User Routes](#-user-routes-apiv1user)
  - [💳 Account & Transaction Routes](#-account--transaction-routes-apiv1account)
- [🚧 Features](#-features)
- [🔮 Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [👤 Author](#-author)

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Zustand / Context API
- Chart.js / Recharts
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Zod

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nishaaddhabale/swiftpay.git
cd swiftpay
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create or update your backend configuration with your MongoDB connection string and JWT secret.

Example:

```js
// backend/config.js
module.exports = {
    JWT_SECRET: "your_secret_key",
    MONGODB_URL: "your_mongodb_connection_string"
};
```

> **Security:** Never commit real secrets, database credentials, or production environment variables to Git.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## ▶️ Usage

### Start the Backend

```bash
cd backend
node index.js
```

The backend typically runs on:

```text
http://localhost:3000
```

### Start the Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The frontend is typically available at:

```text
http://localhost:5173
```

## 💡 Usage Examples

### Transferring Money

1. Sign in to your SwiftPay account.
2. Search for a user by name or username.
3. Select the recipient.
4. Enter the amount and transaction category.
5. Confirm the transfer.
6. The backend validates the balance and processes the transfer atomically.

### Viewing Analytics

1. Log in to your account.
2. Open the dashboard.
3. Review your current balance and cash-flow statistics.
4. Analyze income versus expenses.
5. Review spending by category.
6. Open transaction history for detailed records.

### Exporting Transactions

1. Open the Transactions page.
2. Filter the required transaction period.
3. Use the export functionality.
4. Download the transaction data as CSV or JSON.

---

# 🔌 API Documentation

Base API path:

```text
/api/v1
```

Authentication-protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 👤 User Routes (`/api/v1/user`)

This section handles authentication, identity management, and user discovery.

### 1. Register User

**`POST /api/v1/user/signup`**

Creates a new user, hashes their password, and automatically provisions a new account with a randomized starting balance or zero balance.

#### Input Body

```json
{
    "username": "nishaad@example.com",
    "firstName": "Nishaad",
    "lastName": "Dhabale",
    "password": "securepassword123"
}
```

#### Sample Output

```json
{
    "message": "User created successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

---

### 2. Authenticate User

**`POST /api/v1/user/signin`**

Validates user credentials and returns a JWT for accessing protected routes.

#### Input Body

```json
{
    "username": "nishaad@example.com",
    "password": "securepassword123"
}
```

#### Sample Output

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

---

### 3. Update Profile

**`PUT /api/v1/user/`**

Allows a logged-in user to update personal information.

**Authentication:** Required.

#### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

#### Input Body

```json
{
    "firstName": "Nish",
    "password": "newpassword456"
}
```

#### Sample Output

```json
{
    "message": "Updated successfully"
}
```

---

### 4. Search Users

**`GET /api/v1/user/bulk?filter=nish`**

Fetches users matching a search query by first name, last name, or username. This helps users find recipients before sending money.

#### Example Request

```http
GET /api/v1/user/bulk?filter=nish
```

#### Sample Output

```json
{
    "user": [
        {
            "username": "nishaad@example.com",
            "firstName": "Nishaad",
            "lastName": "Dhabale",
            "_id": "65b1c2d3e4f5a6b7c8d9e0f1"
        }
    ]
}
```

---

# 💳 Account & Transaction Routes (`/api/v1/account`)

This section manages wallet operations, transaction processing, and financial analytics.

## 5. Get Balance & Stats

**`GET /api/v1/account/balance`**

Retrieves the current user's balance along with aggregate statistics used by the analytics dashboard.

**Authentication:** Required.

#### Sample Output

```json
{
    "balance": 5430.50,
    "statistics": {
        "totalReceived": 12000.00,
        "totalSent": 6569.50,
        "netCashFlow": 5430.50
    }
}
```

### Statistics

| Field | Description |
|---|---|
| `balance` | Current wallet balance |
| `totalReceived` | Total funds received |
| `totalSent` | Total funds sent |
| `netCashFlow` | Total received minus total sent |

---

## 6. Transfer Funds

**`POST /api/v1/account/transfer`**

Executes an atomic MongoDB transaction to move funds from the sender to the receiver. The request validates that the sender has sufficient balance before processing.

**Authentication:** Required.

#### Input Body

```json
{
    "to": "65b1c2d3e4f5a6b7c8d9e0f1",
    "amount": 150.00,
    "category": "Food & Dining"
}
```

#### Sample Output

```json
{
    "message": "Transfer successful",
    "transactionId": "txn_894327498234"
}
```

### Transaction Safety

The transfer operation is designed around MongoDB transactional semantics so the debit and credit are treated as a single operation. If the transaction cannot be completed, the operation is rolled back rather than leaving the transfer partially applied.

---

## 7. Transaction History

**`GET /api/v1/account/transactions?period=30days`**

Fetches transaction history for dashboards, categorical analysis, historical graphs, and CSV/JSON export.

**Authentication:** Required.

#### Example Request

```http
GET /api/v1/account/transactions?period=30days
```

#### Sample Output

```json
{
    "transactions": [
        {
            "id": "txn_894327498234",
            "type": "sent",
            "amount": 150.00,
            "category": "Food & Dining",
            "counterparty": "John Doe",
            "timestamp": "2023-10-27T14:32:00Z"
        }
    ],
    "categoricalSplit": {
        "Food & Dining": 150.00,
        "Utilities": 80.00
    }
}
```

### Transaction Fields

| Field | Description |
|---|---|
| `id` | Unique transaction identifier |
| `type` | Whether the transaction was sent or received |
| `amount` | Transaction amount |
| `category` | Category assigned to the transaction |
| `counterparty` | Other user involved in the transaction |
| `timestamp` | Time at which the transaction occurred |

---

## 📊 API Summary

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| `POST` | `/api/v1/user/signup` | No | Register a new user |
| `POST` | `/api/v1/user/signin` | No | Authenticate user |
| `PUT` | `/api/v1/user/` | Yes | Update profile |
| `GET` | `/api/v1/user/bulk` | No | Search users |
| `GET` | `/api/v1/account/balance` | Yes | Get balance and statistics |
| `POST` | `/api/v1/account/transfer` | Yes | Transfer funds |
| `GET` | `/api/v1/account/transactions` | Yes | Get transaction history |

---

# 📂 Project Structure

```text
swiftpay/
├── backend/
│   ├── routes/
│   │   ├── user.js
│   │   └── account.js
│   ├── db.js
│   ├── middleware.js
│   ├── config.js
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   └── layout/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# 🚧 Features

- [x] User authentication with JWT
- [x] Password hashing
- [x] MongoDB database integration
- [x] Database-level transaction safety
- [x] Input validation using Zod
- [x] Peer-to-peer money transfers
- [x] User search
- [x] Advanced analytics dashboard
- [x] Income vs. expense tracking
- [x] Cash-flow statistics
- [x] Categorical transaction analysis
- [x] Transaction history
- [x] CSV export
- [x] JSON export
- [x] Responsive UI
- [x] Global state management

# 🔮 Future Improvements

- **Scheduled Payments:** Support recurring transfers and scheduled payments.
- **Profile Pictures:** Allow users to upload avatars.
- **Real-time Notifications:** Use WebSockets to notify users when money is received.
- **Budgets:** Allow users to define spending limits for individual categories.
- **Transaction Search:** Add advanced filtering by amount, category, recipient, and date.
- **Improved Security:** Add rate limiting, refresh tokens, and stronger production security controls.
- **Deployment:** Add production deployment configuration and CI/CD.

# 🤝 Contributing

Contributions are welcome!

1. Fork the project.
2. Create your feature branch:

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes:

```bash
git commit -m "Add AmazingFeature"
```

4. Push the branch:

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request.

# 👤 Author

**Nishaad Dhabale**

- GitHub: [@nishaaddhabale](https://github.com/nishaaddhabale)
- Projects: FreeFlow, Mindstash, SwiftPay

---

## 📄 License

This project is intended as a portfolio and learning project. Add an appropriate open-source license if you plan to distribute or accept external contributions.
