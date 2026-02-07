import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/dashboard:
 *   get:
 *     description: Retrieve dashboard statistics (counts for users, persons, announcements, etc.).
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics.
 *       401:
 *         description: Access denied.
 */
router.get("/", verifyToken, getDashboardStats);

export default router;
