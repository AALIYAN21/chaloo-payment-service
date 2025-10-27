import {proccessPaymentController, GetAccessTokenController} from "../controller/payment.controller.js";
import express from "express";
const router = express.Router();

router.post("/", proccessPaymentController);
router.post("/token", GetAccessTokenController);


export default router;