import { Router } from "express";
import { FirstRoute } from "../controllers";
const router = Router();
router.get("/", FirstRoute);
export default router;
