import { Router } from "express";
import {
  getAllAppointments,
  getMyAppointments,
  getMyPersonAppointments,
  getNextPersonAppointment,
  createAppointment,
  getAppointmentById,
  deleteAppointment,
  updateAppointment,
  updateAppointmentStatusTo3,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

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
router.get("/", getAllAppointments);

/**
 * @openapi
 * /api/v1/appointments/me:
 *   get:
 *     description: Retrieve appointments for the authenticated user (user_id from JWT oid), ordered by preferred_date descending. Optional top limits the number of results.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: top
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of appointments to return (ordered by preferred_date descending).
 *     responses:
 *       200:
 *         description: A list of appointments for the current user.
 *       401:
 *         description: Unauthorized.
 */
router.get("/me", verifyToken, getMyAppointments);

/**
 * @openapi
 * /api/v1/appointments/persons/me:
 *   get:
 *     description: Retrieve appointments for the authenticated person (person_id from JWT oid), ordered by preferred_date descending. Optional top limits the number of results.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: top
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of appointments to return (ordered by preferred_date descending).
 *     responses:
 *       200:
 *         description: A list of appointments for the current person.
 *       401:
 *         description: Unauthorized.
 */
router.get("/persons/me", verifyToken, getMyPersonAppointments);

/**
 * @openapi
 * /api/v1/appointments/persons/me/next:
 *   get:
 *     description: Retrieve the next upcoming appointment for the authenticated person (person_id from JWT oid).
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The next appointment for the person, or null if none found.
 *       401:
 *         description: Unauthorized.
 */
router.get("/persons/me/next", verifyToken, getNextPersonAppointment);

/**
 * @openapi
 * /api/v1/appointments/{id}:
 *   get:
 *     description: Retrieve an appointment by ID.
 *     tags: [Appointments]
 */
router.get("/:id", getAppointmentById);

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
router.post("/", createAppointment);

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
router.delete("/:id", deleteAppointment);

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
router.put("/:id", updateAppointment);

/**
 * @openapi
 * /api/v1/appointments/{id}/status/reschedule:
 *   put:
 *     description: Update an appointment status to reschedule by ID.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Appointment status updated successfully.
 */
router.put("/:id/status/reschedule", updateAppointmentStatusTo3);

export default router;
