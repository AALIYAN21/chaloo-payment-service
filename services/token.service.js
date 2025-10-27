
import axios from "axios";
import qs from "qs";

export const getPaymentToken = async (merchant_id, secured_key, basket_id, trans_amount, currency_code) => {
    console.log("Data for Token:", merchant_id, secured_key, basket_id, trans_amount, currency_code);
    const data = {
        MERCHANT_ID: merchant_id,
        SECURED_KEY: secured_key,
        BASKET_ID: basket_id,
        TXNAMT: trans_amount,
        CURRENCY_CODE: currency_code
    };
    try {
        const response = await axios.post("https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken", qs.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log(response.data.ACCESS_TOKEN);
        return {
            success: true,
            message: "Success",
            data: response.data,
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.message
        };
    }
}

export default getPaymentToken;