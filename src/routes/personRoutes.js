import { Router } from "express";
import {
  getAllPersons,
  createPerson,
  getPersonById,
  deletePerson,
  updatePersonRecord,
  loginUser,
  getCurrentPerson,
  updateCurrentPerson,
  changeCurrentPersonPassword,
} from "../controllers/personController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/persons:
 *   get:
 *     description: Retrieve a list of all persons. Optionally filter by status.
 *     tags: [Persons]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter persons by status
 *     responses:
 *       200:
 *         description: A list of persons.
 */
router.get("/", verifyToken, getAllPersons);

/**
 * @openapi
 * /api/v1/persons/me:
 *   get:
 *     description: Retrieve the currently authenticated person.
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: The current person.
 */
router.get("/me", verifyToken, getCurrentPerson);

/**
 * @openapi
 * /api/v1/persons/me:
 *   put:
 *     description: Update the currently authenticated person.
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date-time
 *               gender:
 *                 type: string
 *               disability_type:
 *                 type: string
 *               address:
 *                 type: string
 *               contact_no:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Person updated successfully.
 */
router.put("/me", verifyToken, updateCurrentPerson);

/**
 * @openapi
 * /api/v1/persons/me/change-password:
 *   post:
 *     description: Change the password of the currently authenticated person.
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - old_password
 *               - new_password
 *               - confirm_password
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully.
 */
router.post("/me/change-password", verifyToken, changeCurrentPersonPassword);

/**
 * @openapi
 * /api/v1/persons/{id}:
 *   get:
 *     description: Retrieve a person by ID.
 *     tags: [Persons]
 */
router.get("/:id", verifyToken, getPersonById);

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
router.post("/", createPerson);

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
router.delete("/:id", verifyToken, deletePerson);

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
router.put("/:id", verifyToken, updatePersonRecord);

/**
 * @openapi
 * /api/v1/persons/login:
 *   post:
 *     description: Login a user.
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post("/login", loginUser);

export default router;
