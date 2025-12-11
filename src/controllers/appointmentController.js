import { findAll, create, findById, update, remove } from '../repositories/appointmentRepository.js';

export async function getAllAppointments(req, res) {
    var allAppointments = await findAll();
    res.status(200).json(allAppointments);
}
    
export async function createAppointment(req, res) {
    var newAppointment = req.body;

    if (!newAppointment) {
        return res.status(400).json({ error: 'Appointment data is required' });
    }

    if (
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

    await create(newAppointment);
    return res.status(201);
}

export async function getAppointmentById(req, res) {
    var appointment = await findById(req.params.id);
    return res.status(200).json(appointment);
}

export async function updateAppointment(id, appointmentData) {
    await update(id, appointmentData);
    return res.status(200);
}

export async function deleteAppointment(req, res) {
    await remove(req.params.id);
    return res.status(200);
}
