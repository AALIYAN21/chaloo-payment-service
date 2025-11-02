import crypto from "crypto";
import dotenv from "dotenv";
import paymentModel from '../models/payment.models.js';
import paymentHistoryModel from '../models/paymentHistory.models.js';
dotenv.config();


export const handleIPN = async (data) => {
    try {
        console.log("📩 IPN Received:", data);

        const { basket_id, validation_hash, err_code } = data;
        console.log("Data received from Params:", basket_id, err_code, validation_hash);

        const merchant_id = process.env.MERCHANT_ID;
        const secured_key = process.env.SECURED_KEY;

        console.log("Secrets Loaded:", merchant_id, secured_key);

        // Step 1: Handle non-successful payments
        if (err_code !== "000") {
            console.log("❌ Payment failed with error code:", err_code);
            const failedPayment = await paymentHistoryModel.findOne({ basketId: basket_id });
            if(!failedPayment){
                console.log("No Record Found for basketId:", basket_id);
            }
            const updatePaymentFailed = await paymentHistoryModel.updateOne({basketId: basket_id}, {status: "Failed", validationHash: validation_hash});
            return {
                status: 400,
                message: `Payment failed with error code: ${err_code}`,
                data: failedPayment,
                document: updatePaymentFailed
            };
        }

        // Step 2: Generate local validation hash (using PayFast's official order)
        const localHash = crypto
            .createHash("sha256")
            .update(`${basket_id}|${secured_key}|${merchant_id}|${err_code}`)
            .digest("hex")

        // console.log("🔑 Local Hash:", localHash);
        // console.log("🔐 Received Hash:", validation_hash);

        // Step 3: Compare hashes
        if (localHash !== validation_hash) {
            console.log("❌ Invalid hash — possible tampering detected!");
            return {
                status: 400,
                message: "Invalid hash — possible tampering detected!",
            };
        }

        // Step 4: Process and save payment
        console.log("✅ Valid payment verified for basket:", basket_id);
        const payment = await paymentHistoryModel.findOne({ basketId: basket_id });
        if(!payment){
            console.log("No Record Found for basketId:", basket_id);
        }
        const updatePaymentSuccess = await paymentHistoryModel.updateOne({basketId: basket_id}, {status: "Success", validationHash: validation_hash});
        payment.status = "Success";
        payment.validationHash = validation_hash;
        return {
            status: 200,
            message: "Success",
            data: payment,
            document: updatePaymentSuccess
        }
    } catch (err) {
        console.error("❌ IPN Error:", err);
        return err;
    }
};

export default handleIPN;
