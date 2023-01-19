import { Router } from "express";
import { FirstRoute, SignInController } from "../controllers";

// Create a new Router instance
const router = Router();

// Handle GET requests to the root endpoint '/' using the FirstRoute function
router.get("/", FirstRoute);
router.post("/signIn", SignInController);
// Export the router as the default export
export default router;
