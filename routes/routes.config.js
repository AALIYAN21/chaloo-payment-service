import paymentRouter from "./payment.routes.js";
import hashValidationRouter from "./hashvalidation.routes.js";
import ipnRouter from "./ipn.routes.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createRateLimiter } from "../middleware/ratelimiter.js";
const router = express.Router();

const limiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
})

router.use("/payment", limiter, authMiddleware, paymentRouter);
router.use("/hashvalidation", limiter, hashValidationRouter);
router.use("/ipn", ipnRouter);

export default router;