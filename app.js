// import express from 'express';
// import connectDB from './config/db.js';
// import routes from './routes/routes.config.js';
// import cors from 'cors';
// import fs from "fs";
// import path from "path";

// const app = express();

// app.use(express.json()); // for JSON
// app.use(express.urlencoded({ extended: true })); // for form-data
// app.use(cors('*'));


// // ✅ Serve static files (for serving index.html)
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public")));

// app.get('/health', (req, res) => {
//     res.send('service working...');
// });

// app.use("/api", routes);

// // 🌐 Serve the saved HTML file as a web page
// app.get("/payment", (req, res) => {
//     const filePath = path.join(__dirname, "public", "index.html");
//     if (fs.existsSync(filePath)) {
//         res.sendFile(filePath);
//     } else {
//         res.status(404).send("<h2>No payment page found</h2>");
//     }
// });
// app.use

// connectDB();

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path, { format } from "path";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";
import router from "./routes/routes.config.js";
import { createRateLimiter } from "./middleware/ratelimiter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cookieParser());

const limiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
});


// 🧾 Serve index.html
app.get("/", limiter, (req, res) => {
    const token = req.query.auth || null;
    console.log("Authorization Header:", token);

    if (token) {
        // ✅ Option 1 — Send as cookie
        res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "Lax"
        });
    }

    // ✅ Serve HTML page
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve index.html
connectDB();

// SERVE SUCCESS PAGE
app.get("/success", limiter, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "success.html"));
})

// SERVER FAILURE PAGE
app.get("/failure", limiter, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "failure.html"));
})

app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
