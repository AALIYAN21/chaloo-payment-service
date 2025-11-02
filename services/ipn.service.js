import payment from "../models/payment.models.js";

export const getIpnIntimation = async (data) => {
    try {
        if (data.err_code === "000" && data.validation_hash) {
            console.log("IPN Received")
            const ipnSuccess = await payment.create({
                basketId: data.basket_id,
                amount: data.merchant_amount,
                hash: data.validation_hash,
                status: "Success"
            });
            return ({ status: 200, message: "Success", data: ipnSuccess });
        } else {
            console.log("IPN Not Received")
            return ({ status: 400, message: "Failed", data: null });
        }
    } catch (err) {
        return err;
    }
}

export default getIpnIntimation