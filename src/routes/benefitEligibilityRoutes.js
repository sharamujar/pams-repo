import { Router } from 'express';
import { 
    getAllBenefitEligibility, 
    createBenefitEligibility, 
    getBenefitEligibilityById, 
    deleteBenefitEligibility, 
    updateBenefitEligibility 
} from '../controllers/benefitEligibilityController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/benefit-eligibility:
 *   get:
 *     description: Retrieve all benefit eligibility records.
 *     tags: [Benefit Eligibility]
 *     responses:
 *       200:
 *         description: A list of benefit eligibility records.
 */
router.get('/', verifyToken, getAllBenefitEligibility);

/**
 * @openapi
 * /api/v1/benefit-eligibility/{id}:
 *   get:
 *     description: Retrieve a benefit eligibility record by ID.
 *     tags: [Benefit Eligibility]
 */
router.get('/:id', verifyToken, getBenefitEligibilityById);

/**
 * @openapi
 * /api/v1/benefit-eligibility:
 *   post:
 *     description: Create a new benefit eligibility record.
 *     tags: [Benefit Eligibility]
 *     responses:
 *       201:
 *         description: Record created successfully.
 */
router.post('/', verifyToken, createBenefitEligibility);

/**
 * @openapi
 * /api/v1/benefit-eligibility/{id}:
 *   delete:
 *     description: Delete a benefit eligibility record by ID.
 *     tags: [Benefit Eligibility]
 *     responses:
 *       200:
 *         description: Record deleted successfully.
 */
router.delete('/:id', verifyToken, deleteBenefitEligibility);

/**
 * @openapi
 * /api/v1/benefit-eligibility/{id}:
 *   put:
 *     description: Update a benefit eligibility record by ID.
 *     tags: [Benefit Eligibility]
 *     responses:
 *       200:
 *         description: Record updated successfully.
 */
router.put('/:id', verifyToken, updateBenefitEligibility);

export default router;
