// utils/rateLimiter.js
import rateLimit from "express-rate-limit";

/**
 * Creates a configurable rate limiter middleware.
 * 
 * @param {Object} options - Rate limiter configuration options.
 * @param {number} [options.windowMs=15*60*1000] - Time window in milliseconds (default 15 minutes)
 * @param {number} [options.max=100] - Max number of requests per IP within window
 * @param {string} [options.message] - Custom message for rate limit exceeded
 * @returns Express middleware function
 */
export const createRateLimiter = (options = {}) => {
    const {
        windowMs = 15 * 60 * 1000, // 15 minutes
        max = 100, // limit each IP to 100 requests per window
        message = "Too many requests from this IP, please try again later.",
    } = options;

    return rateLimit({
        windowMs,
        max,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
        message,
    });
};
