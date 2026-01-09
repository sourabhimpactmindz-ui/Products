
import express from "express";
import { webhooks } from "../controllers/cart_controller.js";
import { Router } from "express";

const webhookroute = Router();

webhookroute.post("/webhook", express.raw({ type: "application/json" }), webhooks);

export default webhookroute;