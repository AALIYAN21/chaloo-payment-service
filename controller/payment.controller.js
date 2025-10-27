import proccessPayment from "../services/paymentProcessing.service.js";
import getPaymentToken from "../services/token.service.js";
import dotenv from "dotenv";
dotenv.config();


export const proccessPaymentController = async (req, res) => {
    const { trans_amount, success_url, failure_url } = req.body;
    console.log("Data sending to proccessPayment:", trans_amount, success_url, failure_url);
    const response = await proccessPayment(trans_amount, success_url, failure_url);
    res.status(200).json(response);
}

export const GetAccessTokenController = async (req, res) => {
    // Getting environment variables
    const merchant_id = "236264";
    const secured_key = "UgQUyHYUXSC60LnfzgMlwZb4gJK";
    const currency_code = "PKR";
    const { basket_id, trans_amount } = req.body;
    const response = await getPaymentToken(merchant_id, secured_key, basket_id, trans_amount, currency_code);
    res.status(200).json(response);
}

export default { proccessPaymentController, GetAccessTokenController };