import { Router } from 'express';
import { 
    getAllServiceTypes, 
    createServiceType, 
    getServiceTypeById, 
    deleteServiceType, 
    updateServiceType,
    updateServiceTypeStatus
} from '../controllers/serviceTypeController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/service-types:
 *   get:
 *     description: Retrieve a list of service types. Optional query status (e.g. 1 = pending/active) filters by active column.
 *     tags: [Service Types]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *         description: Filter by active (1 = pending).
 *     responses:
 *       200:
 *         description: A list of service types.
 */
router.get('/', verifyToken, getAllServiceTypes);

/**
 * @openapi
 * /api/v1/service-types/{id}:
 *   get:
 *     description: Retrieve a service type by ID.
 *     tags: [Service Types]
 */
router.get('/:id', verifyToken, getServiceTypeById);

/**
 * @openapi
 * /api/v1/service-types:
 *   post:
 *     description: Create a new service type.
 *     tags: [Service Types]
 *     responses:
 *       201:
 *         description: Service type created successfully.
 */
router.post('/', verifyToken, createServiceType);

/**
 * @openapi
 * /api/v1/service-types/{id}:
 *   delete:
 *     description: Delete a service type by ID.
 *     tags: [Service Types]
 *     responses:
 *       200:
 *         description: Service type deleted successfully.
 */
router.delete('/:id', verifyToken, deleteServiceType);

/**
 * @openapi
 * /api/v1/service-types/{id}:
 *   put:
 *     description: Update a service type by ID.
 *     tags: [Service Types]
 *     responses:
 *       200:
 *         description: Service type updated successfully.
 */
router.put('/:id', verifyToken, updateServiceType);

/**
 * @openapi
 * /api/v1/service-types/{id}/status:
 *   patch:
 *     description: Update a service type status by ID.
 *     tags: [Service Types]
 *     responses:
 *       200:
 *         description: Service type status updated successfully.
 *       400:
 *         description: Status is required.
 *       404:
 *         description: Service type not found.
 */
router.patch('/:id/status', verifyToken, updateServiceTypeStatus);

export default router;
