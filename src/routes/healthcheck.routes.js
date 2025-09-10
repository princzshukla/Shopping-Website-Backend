import { Router } from "express";
import { healthchecker } from "../controller/healthcheck.controller.js";

const router = Router();
router.route("/").get(healthchecker);

export default router;
