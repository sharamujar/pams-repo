import { findAll, create, findById, update, remove } from '../repositories/appointmentRepository.js';

export async function getAllAppointments(req, res) {
    try {
        const allAppointments = await findAll();
        return res.status(200).json(allAppointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch appointments" });
    }
}

export async function createAppointment(req, res) {
    const newAppointment = req.body;

    if (
        !newAppointment ||
        !newAppointment.person_id ||
        !newAppointment.service_id ||
        !newAppointment.preferred_date ||
        newAppointment.status === undefined ||
        !newAppointment.user_id
    ) {
        return res.status(400).json({
            error: 'person_id, service_id, preferred_date, status, and user_id are required fields'
        });
    }

    try {
        const created = await create(newAppointment);
        return res.status(201).json(created);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create appointment" });
    }
}

export async function getAppointmentById(req, res) {
    try {
        const appointment = await findById(req.params.id);
        return res.status(200).json(appointment || null);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to get appointment" });
    }
}

export async function updateAppointment(req, res) {
    const id = req.params.id;
    const appointmentData = req.body;

    try {
        const updated = await update(id, appointmentData);
        return res.status(200).json({
            message: 'Appointment updated successfully',
            updated
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update appointment" });
    }
}

export async function deleteAppointment(req, res) {
    try {
        const deleted = await remove(req.params.id);
        return res.status(200).json({
            message: deleted ? "Appointment deleted" : "Appointment not found"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete appointment" });
    }
}
