

const{ User,Account } = require("../db.js");
const zod = require("zod");
const {authMiddleware} = require("../middleware.js");
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get("/balance",authMiddleware,async(req,res)=>{
    const acc= await Account.findOne({
        userid:req.userid
    })
    res.json({
     balance:acc.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    console.log("pohoch gaya janab");
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const accounts = await Account.findOne({ userid: req.userid }).session(session);

    if (!accounts || accounts.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userid: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});




module.exports = router;