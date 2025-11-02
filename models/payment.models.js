import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    basketId: {type: String, required: true},
    amount: {type: Number, required: true},
    hash: {type: String, required: true},
    status: {type: String, enum: ["Success", "Failed"], required: true},

}, {timestamps: true});

paymentSchema.index({basketId: 1}, {unique: true});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;