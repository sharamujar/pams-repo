import { Router } from 'express';
import { 
    getAllArchives, 
    createArchive, 
    getArchiveById, 
    deleteArchive, 
    updateArchive 
} from '../controllers/yearlyArchiveController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/yearly-archive:
 *   get:
 *     description: Retrieve all yearly archive records.
 *     tags: [Yearly Archive]
 *     responses:
 *       200:
 *         description: A list of yearly archive records.
 */
router.get('/', verifyToken, getAllArchives);

/**
 * @openapi
 * /api/v1/yearly-archive/{id}:
 *   get:
 *     description: Retrieve a single yearly archive record by ID.
 *     tags: [Yearly Archive]
 */
router.get('/:id', verifyToken, getArchiveById);

/**
 * @openapi
 * /api/v1/yearly-archive:
 *   post:
 *     description: Create a new yearly archive record.
 *     tags: [Yearly Archive]
 *     responses:
 *       201:
 *         description: Record created successfully.
 */
router.post('/', verifyToken, createArchive);

/**
 * @openapi
 * /api/v1/yearly-archive/{id}:
 *   delete:
 *     description: Delete a yearly archive record by ID.
 *     tags: [Yearly Archive]
 *     responses:
 *       200:
 *         description: Record deleted successfully.
 */
router.delete('/:id', verifyToken, deleteArchive);

/**
 * @openapi
 * /api/v1/yearly-archive/{id}:
 *   put:
 *     description: Update a yearly archive record by ID.
 *     tags: [Yearly Archive]
 *     responses:
 *       200:
 *         description: Record updated successfully.
 */
router.put('/:id', verifyToken, updateArchive);

export default router;
