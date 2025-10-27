import crypto from "crypto";
import axios from "axios";
import generateRandomString from "../utils/randomGenertor.js";
import dotenv from "dotenv";
import getPaymentToken from './token.service.js';
import qs from "qs";
dotenv.config();

// Getting environment variables
const merchant_id = process.env.MERCHANT_ID;
const merchant_name = process.env.MERCHANT_NAME;
const proccode = process.env.PROCCODE;
const secured_key = process.env.SECURED_KEY;
const currency_code = process.env.CURRENCY_CODE;

// FUNCTION TO PROCESS PAYMENT AFTER GETTING TOKEN
const proccessPayment = async (trans_amount, succcess_url, failure_url) => {
    // GENERATE ORDER-ID AS BASKET_ID WITH 4 RANDOM CHARACTERS
    // const basket_id = 'Chaloo-' + generateRandomString(4);
    // GET THE TOKEN FIRST
    const basket_id = "FLUX-1234";
    console.log("ENV for token:", merchant_id, secured_key, trans_amount, currency_code)
    const token = await getPaymentToken(merchant_id, secured_key, basket_id, trans_amount, currency_code);
    console.log("Access Token:", token);
    // SEREALIZED DATA TO BE SENT
    const data = {
        TOKEN: token.ACCESS_TOKEN,
        MERCHANT_ID: merchant_id,
        BASKET_ID: basket_id,
        MERCHANT_NAME: merchant_name,
        PROCCODE: proccode,
        TXNAMT: trans_amount,
        CURRENCY_CODE: currency_code,
        SUCCESS_URL: succcess_url,
        FAILURE_URL: failure_url,
        CUSTOMER_MOBILE_NO: "03000000090",
        VERSION: "MERCHANTCART-0.1",
        CUSTOMER_EMAIL_ADDRESS: "someone234@gmai.com",
        ORDER_DATE: new Date().toISOString(),
        TRAN_TYPE: "ECOMM_PURCHASE",
        TXNDESC: "Purchase of a product",
        CHECKOUT_URL: "http://localhost:3000/checkout"
    }
    // SENDING PAYMENT REQUEST
    try {
        const response = await axios.post("https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction", qs.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log("Response:", response.data);
        // CHECK FOR SUCCESS RESPONSE TO RETURN DATA
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
        // RETURN ERROR IN CASE OF FAILURE
        return response;
    } catch (err) {
        // RETURN UNEXPECTED ERROR
        console.log(err.message);
        return err;
    }
}

export default proccessPayment;