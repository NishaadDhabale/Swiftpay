# 🚀 SwiftPay

SwiftPay is a full-stack digital wallet application designed to simulate secure and seamless peer-to-peer fund transfers. Built with a robust MERN stack architecture, it features secure user authentication, real-time balance updates, and transactional integrity using MongoDB sessions to ensure that money is never lost during a transfer.

## 📖 Description
SwiftPay addresses the need for a simplified, secure platform for managing digital transactions. Whether you're sending money to friends or checking your current balance, SwiftPay provides a clean, responsive interface to manage your finances.

Key Features:

Secure Authentication: JWT-based signup and signin with hashed password storage.

Atomic Transactions: Utilizes MongoDB transactions (sessions) to ensure "all-or-nothing" money transfers.

Real-time Search: Search for users by name or username to initiate transfers instantly.

Dashboard Overview: View your current balance and a list of other users on the platform.

Responsive UI: Styled with Tailwind CSS for a modern, mobile-friendly experience.

## 🧭 Table of Contents
🛠️ Tech Stack

⚙️ Installation

▶️ Usage

📂 Project Structure

🔌 API Documentation

🚧 Features

🔮 Future Improvements

👤 Author

## 🛠️ Tech Stack
Frontend:

React.js (Vite)

Tailwind CSS (Styling)

Axios (API Requests)

React Router DOM (Navigation)

Backend:

Node.js & Express.js

MongoDB & Mongoose (Database & Modeling)

JSON Web Tokens (JWT) (Authorization)

Zod (Input Validation)

## ⚙️ Installation
1. Clone the repository

```bash
git clone https://github.com/nishaaddhabale/swiftpay.git
cd swiftpay
```

2. Backend Setup

```bash
cd backend
npm install
```

Create a .env or update config.js:

```javascript
// backend/config.js
module.exports = {
	JWT_SECRET: "your_secret_key",
    MONGODB_URL: "your_mongodb_connection_string"
}
```

3. Frontend Setup

```bash
cd ../frontend
npm install
```

## ▶️ Usage

Start the Backend

```bash
cd backend
node index.js
```

The server typically runs on http://localhost:3000.

Start the Frontend

```bash
cd frontend
npm run dev
```

The application will be available at http://localhost:5173.

## 💡 Usage Examples

Transferring Money

Log in to your account.

Use the search bar to find a user.

Click "Send Money".

Enter the amount and confirm. The system validates your balance before processing.

Sample API Call (Transfer)

Request:

POST /api/v1/account/transfer

Headers: Authorization: Bearer <token>

Body:

```json
{
    "to": "recipient_user_id",
    "amount": 100
}
```

## 📂 Project Structure

```plaintext
├── backend/
│   ├── routes/          # Express route handlers (user, account)
│   ├── db.js            # Mongoose schemas (User, Account)
│   ├── middleware.js    # JWT authentication middleware
│   ├── config.js        # Secrets and configurations
│   └── index.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components (Button, Input, etc.)
│   │   ├── pages/       # Dashboard, Signup, Signin, SendMoney
│   │   ├── App.jsx      # Routing logic
│   │   └── main.jsx     # App entry point
└── README.md
```

## 🔌 API Documentation

User Routes (/api/v1/user)

POST /signup: Register a new user and initialize account with a random balance.

POST /signin: Authenticate user and return JWT.

PUT /: Update user information (password, name).

GET /bulk: Filter users by name/username.

Account Routes (/api/v1/account)

GET /balance: Fetch the logged-in user's balance.

POST /transfer: Execute a secure money transfer.

## 🚧 Features

[x] User authentication with JWT.

[x] Input validation using Zod.

[x] Global state management via React hooks.

[x] Protected routes for Dashboard and Transfers.

[x] Database-level transaction safety.

## 🔮 Future Improvements

Transaction History: Add a page to view past sent/received payments.

Profile Pictures: Allow users to upload avatars.

Websockets: Implement real-time notifications when money is received.

Dark Mode: Toggle between light and dark themes.

## 🤝 Contributing

Contributions are welcome!

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

## 👤 Author

Nishaad Dhabale

GitHub: @nishaaddhabale

Projects: [FreeFlow, Mindstash, SwiftPay]
