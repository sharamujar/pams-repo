import { Router } from 'express'; 
import { getAllPersons, createPerson, getPersonById, deletePerson, updatePersonRecord } from '../controllers/personsController.js';

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
router.get('/', getAllPersons);

/**
 * @openapi
 * /api/v1/persons/{id}:
 *   get:
 *     description: Retrieve a person by ID.
 *     tags: [Persons]
 */
router.get('/:id', getPersonById);

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
router.post('/', createPerson);

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
router.delete('/:id', deletePerson);

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
router.put('/:id', updatePersonRecord);

export default router;
