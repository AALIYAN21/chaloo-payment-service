import handleIPNController from "../controller/hashvalidation.controller.js";
import express from "express";

const router = express.Router();

router.post("/", handleIPNController);

export default router;