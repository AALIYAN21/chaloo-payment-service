import mongoose from "mongoose";

const paymentHistory = new mongoose.Schema({
    amount: {type: Number, default: 0},
    userId: {type: mongoose.Schema.Types.ObjectId, default: null},
    basketId: {type: String, default: null},
    paymentFor: {type: String, enum:["intercity", "shuttle", "corporate", "ebike"], default: "intercity"},
    currencyCode: {type: String, required: true},
    status: {type: String, enum: ["Success", "Failed", "Pending"], default: "Pending"},
    validationHash: {type: String, default: null},
}, {timestamps: true});

paymentHistory.index({userId: 1}, {basketId: 1});

const PaymentHistory = mongoose.model("PaymentHistory", paymentHistory);
export default PaymentHistory;