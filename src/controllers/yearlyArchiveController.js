import { findAll, create, findById, update, remove } from '../repositories/yearlyArchiveRepository.js';

export async function getAllArchives(req, res) {
    const allRecords = await findAll();
    return res.status(200).json(allRecords);
}

export async function createArchive(req, res) {
    const newRecord = req.body;

    if (!newRecord) {
        return res.status(400).json({ error: 'Yearly archive data is required' });
    }

    // Required fields
    const required = [
        'year',
        'total_person_served',
        'total_assistance_given',
        'total_amount'
    ];

    for (const field of required) {
        if (newRecord[field] == null) {
            return res.status(400).json({
                error: `${required.join(', ')} are required fields`
            });
        }
    }

    await create(newRecord);
    return res.status(201).json({ message: "Archive created successfully" });
}

export async function getArchiveById(req, res) {
    const record = await findById(req.params.id);

    if (!record) {
        return res.status(404).json({ error: "Archive not found" });
    }

    return res.status(200).json(record);
}

export async function updateArchive(req, res) {
    const id = req.params.id;
    const recordData = req.body;

    await update(id, recordData);

    return res.status(200).json({ message: "Archive updated successfully" });
}

export async function deleteArchive(req, res) {
    const success = await remove(req.params.id);

    if (!success) {
        return res.status(404).json({ error: "Archive not found" });
    }

    return res.status(200).json({ message: "Archive deleted successfully" });
}
