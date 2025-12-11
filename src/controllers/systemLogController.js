import { findAll, create, findById, update, remove } from '../repositories/systemLogRepository.js';

export async function getAllSystemLogs(req, res) {
    var allLogs = await findAll();
    res.status(200).json(allLogs);
}

export async function createSystemLog(req, res) {
    var newLog = req.body;

    if (!newLog) {
        return res.status(400).json({ error: 'System log data is required' });
    }

    if (!newLog.staff_id || !newLog.action || !newLog.timestamp || !newLog.module) {
        return res.status(400).json({
            error: 'staff_id, action, timestamp, and module are required fields'
        });
    }

    await create(newLog);
    return res.status(201);
}

export async function getSystemLogById(req, res) {
    var log = await findById(req.params.id);
    return res.status(200).json(log);
}

export async function updateSystemLog(id, logData) {
    await update(id, logData);
    return res.status(200);
}

export async function deleteSystemLog(req, res) {
    await remove(req.params.id);
    return res.status(200);
}
