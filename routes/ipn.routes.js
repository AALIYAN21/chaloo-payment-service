import handleIPNController from "../controller/ipn.controller.js";
import express from "express";
const router = express.Router();

router.post("/", handleIPNController);

export default router;