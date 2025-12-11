import { findAll, create, findById, update, remove } from '../repositories/systemLogRepository.js';

function formatToMySQL(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 19).replace("T", " ");
}

export async function getAllSystemLogs(req, res) {
    const allLogs = await findAll();
    return res.status(200).json(allLogs);
}

export async function createSystemLog(req, res) {
    const newLog = req.body;

    if (!newLog) {
        return res.status(400).json({ error: 'System log data is required' });
    }

    if (
        newLog.user_id == null ||
        newLog.action == null ||
        newLog.timestamp == null ||
        newLog.affected_id == null ||
        newLog.table == null
    ) {
        return res.status(400).json({
            error: 'user_id, action, timestamp, affected_id, and table are required fields'
        });
    }

    try {
        newLog.timestamp = formatToMySQL(newLog.timestamp);
    } catch (e) {
        return res.status(400).json({ error: "Invalid timestamp format" });
    }

    await create(newLog);
    return res.status(201).json({ message: "System log created successfully" });
}

export async function getSystemLogById(req, res) {
    const log = await findById(req.params.id);

    if (!log) return res.status(404).json({ error: "Log not found" });

    return res.status(200).json(log);
}

export async function updateSystemLog(req, res) {
    const id = req.params.id;
    const logData = req.body;

    if (logData.timestamp) {
        logData.timestamp = formatToMySQL(logData.timestamp);
    }

    await update(id, logData);
    return res.status(200).json({ message: "System log updated" });
}

export async function deleteSystemLog(req, res) {
    await remove(req.params.id);
    return res.status(200).json({ message: "System log deleted" });
}
