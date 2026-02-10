import { findAll, create, findById, update, remove, findAllByUserId, findAllByPersonId, findNextByPersonId } from '../repositories/appointmentRepository.js';

export async function getAllAppointments(req, res) {
    try {
        const allAppointments = await findAll();
        return res.status(200).json(allAppointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch appointments" });
    }
}

export async function getMyAppointments(req, res) {
    try {
        const userId = req.user?.oid;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: user not identified" });
        }
        const top = req.query.top != null ? parseInt(req.query.top, 10) : null;
        const appointments = await findAllByUserId(userId, Number.isNaN(top) ? null : top);
        return res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch appointments" });
    }
}

export async function getMyPersonAppointments(req, res) {
    try {
        const personId = req.user?.oid;
        if (!personId) {
            return res.status(401).json({ error: "Unauthorized: person not identified" });
        }
        const top = req.query.top != null ? parseInt(req.query.top, 10) : null;
        const appointments = await findAllByPersonId(personId, Number.isNaN(top) ? null : top);
        return res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch appointments by person" });
    }
}

export async function getNextPersonAppointment(req, res) {
    try {
        const personId = req.user?.oid;
        if (!personId) {
            return res.status(401).json({ error: "Unauthorized: person not identified" });
        }
        const appointment = await findNextByPersonId(personId);
        return res.status(200).json(appointment || null);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch next appointment by person" });
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
