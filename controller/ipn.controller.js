import getIpnIntimation from "../services/ipn.service.js";

export const handleIPNController = async (req, res) => {
    try {
        // PayFast sends IPN as POST form-data or x-www-form-urlencoded
        const ipnData = req.body;
        console.log("📩 Received IPN Data:", ipnData);

        // If you want to validate signature or hash
        const response = await getIpnIntimation(ipnData);

        // Acknowledge receipt to PayFast
        res.sendStatus(200);

        // Log or process payment confirmation internally
        console.log("✅ IPN processed successfully:", response);
    } catch (error) {
        console.error("❌ Error handling IPN:", error);
        res.sendStatus(500);
    }
};


export default handleIPNController