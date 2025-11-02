
import axios from "axios";
import qs from "qs";
import generateRandomString from "../utils/randomGenertor.js";
import PaymentHistoryModel from "../models/paymentHistory.models.js";

export const getPaymentToken = async (merchant_id, secured_key, trans_amount, currency_code, userId) => {
    const basket_id = `CTPL-${generateRandomString(4)}`;

    // Log structured info instead of inline
    console.log("🧾 Payment Token Request Data:", {
        userId,
        merchant_id,
        secured_key: "********", // mask sensitive key
        basket_id,
        trans_amount,
        currency_code,
    });

    // Save payment history
    await PaymentHistoryModel.create({ amount: trans_amount, userId, basketId: basket_id, paymentFor: "intercity", currencyCode: currency_code, status: "Pending" });

    const data = {
        MERCHANT_ID: merchant_id,
        SECURED_KEY: secured_key,
        BASKET_ID: basket_id,
        TXNAMT: trans_amount,
        CURRENCY_CODE: currency_code,
    };

    try {
        // Switch easily between sandbox and live
        const baseURL = "https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken";

        const response = await axios.post(baseURL, qs.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            // timeout: 10000, // ⏱ prevent hanging requests
        });

        if (!response.data?.ACCESS_TOKEN) {
            throw new Error("No ACCESS_TOKEN received from PayFast");
        }

        console.log("✅ Token generated successfully:", response.data.ACCESS_TOKEN, "Basket ID:", basket_id);

        return {
            success: true,
            message: "Token generated successfully",
            data: response.data,
            basketId: basket_id,
        };
    } catch (err) {
        console.error("❌ Error generating payment token:", err.response?.data || err.message);

        return {
            success: false,
            message: err.response?.data?.Message || err.message,
            error: err.response?.data || null,
        };
    }
};


export default getPaymentToken;