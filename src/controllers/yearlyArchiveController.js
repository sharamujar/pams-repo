import { findAll, create, findById, update, remove } from '../repositories/yearlyArchiveRepository.js';

export async function getAllArchives(req, res) {
    var allRecords = await findAll();
    res.status(200).json(allRecords);
}

export async function createArchive(req, res) {
    var newRecord = req.body;

    if (!newRecord) {
        return res.status(400).json({ error: 'Yearly archive data is required' });
    }

    if (!newRecord.year || !newRecord.total_person_served || !newRecord.total_assistance_given || !newRecord.total_amount) {
        return res.status(400).json({
            error: 'year, total_person_served, total_assistance_given, and total_amount are required fields'
        });
    }

    await create(newRecord);
    return res.status(201);
}

export async function getArchiveById(req, res) {
    var record = await findById(req.params.id);
    return res.status(200).json(record);
}

export async function updateArchive(id, recordData) {
    await update(id, recordData);
    return res.status(200);
}

export async function deleteArchive(req, res) {
    await remove(req.params.id);
    return res.status(200);
}
