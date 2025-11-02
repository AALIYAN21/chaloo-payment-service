import handleIPN from "../services/hashvalidation.service.js";

export const handleIPNController = async (req, res) => {
    try {
        const response = await handleIPN(req.body);
        res.status(200).json({message: "OK"});
        console.log("Payment Processed:",response.message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to handle IPN" });
    }
}

export default handleIPNController