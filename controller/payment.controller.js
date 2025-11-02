import getPaymentToken from "../services/token.service.js";
import dotenv from "dotenv";
dotenv.config();


export const GetAccessTokenController = async (req, res) => {
    // Getting environment variables
    const merchant_id = process.env.MERCHANT_ID;
    const secured_key = process.env.SECURED_KEY;
    const currency_code = process.env.CURRENCY_CODE;
    const { trans_amount, userId } = req.body;
    console.log(req.body);
    const response = await getPaymentToken(merchant_id, secured_key, trans_amount, currency_code, userId);
    res.status(200).json(response);
}
export default GetAccessTokenController;