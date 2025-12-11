import { Router } from 'express';
import {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    deleteAppointment,
    updateAppointment
} from '../controllers/appointmentController.js';

const router = Router();

/**
 * @openapi
 * /api/v1/appointments:
 *   get:
 *     description: Retrieve a list of all appointments.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments.
 */
router.get('/', getAllAppointments);

/**
 * @openapi
 * /api/v1/appointments/{id}:
 *   get:
 *     description: Retrieve an appointment by ID.
 *     tags: [Appointments]
 */
router.get('/:id', getAppointmentById);

/**
 * @openapi
 * /api/v1/appointments:
 *   post:
 *     description: Create a new appointment.
 *     tags: [Appointments]
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 */
router.post('/', createAppointment);

/**
 * @openapi
 * /api/v1/appointments/{id}:
 *   delete:
 *     description: Delete an appointment by ID.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Appointment deleted successfully.
 */
router.delete('/:id', deleteAppointment);

/**
 * @openapi
 * /api/v1/appointments/{id}:
 *   put:
 *     description: Update an appointment by ID.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Appointment updated successfully.
 */
router.put('/:id', updateAppointment);

export default router;
