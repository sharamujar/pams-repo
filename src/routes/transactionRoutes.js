import { Router } from "express";
import {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  deleteTransaction,
  updateTransaction,
  getAllMyTransactions,
  updateTransactionStatus,
} from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/transactions:
 *   get:
 *     description: Retrieve a list of all transactions.
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of transactions.
 */
router.get("/", verifyToken, getAllTransactions);

/**
 * @openapi
 * /api/v1/transactions/me:
 *   get:
 *     description: Retrieve a list of all transactions for the authenticated user.
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of transactions for the authenticated user.
 */
router.get("/me", verifyToken, getAllMyTransactions);

/**
 * @openapi
 * /api/v1/transactions/{id}:
 *   get:
 *     description: Retrieve a transaction by ID.
 *     tags: [Transactions]
 */
router.get("/:id", verifyToken, getTransactionById);

/**
 * @openapi
 * /api/v1/transactions:
 *   post:
 *     description: Create a new transaction.
 *     tags: [Transactions]
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 */
router.post("/", verifyToken, createTransaction);

/**
 * @openapi
 * /api/v1/transactions/{id}:
 *   delete:
 *     description: Delete a transaction by ID.
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Transaction deleted successfully.
 */
router.delete("/:id", verifyToken, deleteTransaction);

/**
 * @openapi
 * /api/v1/transactions/{id}:
 *   put:
 *     description: Update a transaction by ID.
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 */
router.put("/:id", verifyToken, updateTransaction);

/**
 * @openapi
 * /api/v1/transactions/{id}/status:
 *   patch:
 *     description: Update transaction status by ID.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: integer
 *                 description: New status value
 *     responses:
 *       200:
 *         description: Transaction status updated successfully.
 *       400:
 *         description: Invalid status value.
 *       404:
 *         description: Transaction not found.
 */
router.patch("/:id/status", verifyToken, updateTransactionStatus);

export default router;
