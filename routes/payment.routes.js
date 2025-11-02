import GetAccessTokenController from "../controller/payment.controller.js";
import express from "express";
const router = express.Router();


router.post("/token", GetAccessTokenController);


export default router;