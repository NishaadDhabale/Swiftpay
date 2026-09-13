const { User, Account, Transaction } = require('../db.js');
const zod = require('zod');
const { authMiddleware } = require('../middleware.js');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
  const acc = await Account.findOne({
    userid: req.userid,
  });
  res.json({
    balance: acc.balance,
  });
});

router.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;


  const accounts = await Account.findOne({ userid: req.userid }).session(
    session
  );

  if (!accounts || accounts.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const toAccount = await Account.findOne({ userid: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  await Account.updateOne(
    { userid: req.userid },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userid: to },
    { $inc: { balance: amount } }
  ).session(session);

  await Transaction.create([{
    sender: req.userid,
    receiver: to,
    amount: amount,
    status: 'completed'
  }], { session });


  await session.commitTransaction();
  res.json({
    message: 'Transfer successful',
  });
});

module.exports = router;

router.get('/transactions', authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = {
    $or: [{ sender: req.userid }, { receiver: req.userid }],
  };

  const total = await Transaction.countDocuments(query);
  const transactions = await Transaction.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('sender', 'firstName lastName username')
    .populate('receiver', 'firstName lastName username');

  res.json({
    transactions,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});


router.get('/analytics', authMiddleware, async (req, res) => {

  const query = {
    $or: [{ sender: req.userid }, { receiver: req.userid }],
  };

  const transactions = await Transaction.find(query);

  let totalSent = 0;
  let totalReceived = 0;
  const dailyMap = {};

  transactions.forEach((tx) => {
    const dateStr = tx.createdAt.toISOString().split('T')[0];
    if (!dailyMap[dateStr]) {
      dailyMap[dateStr] = { date: dateStr, sent: 0, received: 0 };
    }

    if (tx.sender.toString() === req.userid.toString()) {
      totalSent += tx.amount;
      dailyMap[dateStr].sent += tx.amount;
    } else {
      totalReceived += tx.amount;
      dailyMap[dateStr].received += tx.amount;
    }
  });

  res.json({
    totalSent,
    totalReceived,
    netFlow: totalReceived - totalSent,
    transactionCount: transactions.length,
    daily: Object.values(dailyMap).sort((a, b) => new Date(a.date) - new Date(b.date)),
  });
});
