import { Router } from 'express';
import { 
    getAllServiceTypes, 
    createServiceType, 
    getServiceTypeById, 
    deleteServiceType, 
    updateServiceType 
} from '../controllers/serviceTypeController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/service-types:
 *   get:
 *     description: Retrieve a list of all service types.
 *     tags: [Service Types]
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

export default router;
