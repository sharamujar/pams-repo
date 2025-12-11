import { Router } from 'express';
import { 
    getAllArchives, 
    createArchive, 
    getArchiveById, 
    deleteArchive, 
    updateArchive 
} from '../controllers/yearlyArchiveController.js';

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
router.get('/', getAllArchives);

/**
 * @openapi
 * /api/v1/yearly-archive/{id}:
 *   get:
 *     description: Retrieve a single yearly archive record by ID.
 *     tags: [Yearly Archive]
 */
router.get('/:id', getArchiveById);

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
router.post('/', createArchive);

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
router.delete('/:id', deleteArchive);

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
router.put('/:id', updateArchive);

export default router;
