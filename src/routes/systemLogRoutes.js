import { Router } from 'express';
import { 
    getAllSystemLogs, 
    createSystemLog, 
    getSystemLogById, 
    deleteSystemLog, 
    updateSystemLog 
} from '../controllers/systemLogController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/system-logs:
 *   get:
 *     description: Retrieve a list of all system logs.
 *     tags: [System Logs]
 *     responses:
 *       200:
 *         description: A list of system logs.
 */
router.get('/', verifyToken, getAllSystemLogs);

/**
 * @openapi
 * /api/v1/system-logs/{id}:
 *   get:
 *     description: Retrieve a system log by ID.
 *     tags: [System Logs]
 */
router.get('/:id', verifyToken, getSystemLogById);

/**
 * @openapi
 * /api/v1/system-logs:
 *   post:
 *     description: Create a new system log entry.
 *     tags: [System Logs]
 *     responses:
 *       201:
 *         description: System log created successfully.
 */
router.post('/', verifyToken, createSystemLog);

/**
 * @openapi
 * /api/v1/system-logs/{id}:
 *   delete:
 *     description: Delete a system log entry by ID.
 *     tags: [System Logs]
 *     responses:
 *       200:
 *         description: System log deleted successfully.
 */
router.delete('/:id', verifyToken, deleteSystemLog);

/**
 * @openapi
 * /api/v1/system-logs/{id}:
 *   put:
 *     description: Update a system log entry by ID.
 *     tags: [System Logs]
 *     responses:
 *       200:
 *         description: System log updated successfully.
 */
router.put('/:id', verifyToken, updateSystemLog);

export default router;
