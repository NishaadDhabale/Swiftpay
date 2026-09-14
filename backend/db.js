const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});
const AccountsSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: {
    type: Number,
    required: true,
  },
});
const TRANSACTION_CATEGORIES = [
        'General',
        'Personal Transfer',
        'Business Payment',
        'Family & Friends',
        'Bills & Utilities',
        'Shopping',
        'Food',
        'Transport',
        'Entertainment',
        'Health',
        'Other'
];
const TransactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'General',
        'Personal Transfer',
        'Business Payment',
        'Family & Friends',
        'Bills & Utilities',
        'Shopping',
        'Food',
        'Transport',
        'Entertainment',
        'Health',
        'Other',
      ],
      default: 'General',
    },
    status: {
      type: String,
      enum: ['completed', 'failed', 'pending'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Accounts', AccountsSchema);

module.exports = {
  User,
  Account,
  Transaction,
  TRANSACTION_CATEGORIES,
};
