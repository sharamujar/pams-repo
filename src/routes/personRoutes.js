import { Router } from 'express'; 
import { getAllPersons, createPerson, getPersonById, deletePerson, updatePersonRecord } from '../controllers/personController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/persons:
 *   get:
 *     description: Retrieve a list of all persons.
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: A list of persons.
 */
router.get('/', verifyToken, getAllPersons);

/**
 * @openapi
 * /api/v1/persons/{id}:
 *   get:
 *     description: Retrieve a person by ID.
 *     tags: [Persons]
 */
router.get('/:id', verifyToken, getPersonById);

/**
 * @openapi
 * /api/v1/persons:
 *   post:
 *     description: Create a new person.
 *     tags: [Persons]
 *     responses:
 *       201:
 *         description: Person created successfully.
 */
router.post('/', verifyToken, createPerson);

/**
 * @openapi
 * /api/v1/persons/{id}:
 *   delete:
 *     description: Delete a person by ID.
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: Person deleted successfully.
 */
router.delete('/:id', verifyToken, deletePerson);

/**
 * @openapi
 * /api/v1/persons/{id}:
 *   put:
 *     description: Update a person by ID.
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: Person updated successfully.
 */
router.put('/:id', verifyToken, updatePersonRecord);

export default router;
