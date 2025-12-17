import { Router } from 'express';
import { loginUser, getAllUsers, createUser, getUserById, deleteUser, updateUser } from '../controllers/userController.js';


const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     description: Retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/', getAllUsers);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     description: Retrieve a list of all users.
 *     tags: [Users]
 */
router.get('/:id', getUserById);

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     description: Create a new user.
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/', createUser);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     description: Delete a user by ID.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
router.delete('/:id', deleteUser);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   put:
 *     description: Update a user by ID.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
router.put('/:id', updateUser);

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     description: Login a user.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post('/login', loginUser);

export default router;