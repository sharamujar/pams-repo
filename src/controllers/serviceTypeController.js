import { findAll, create, findById, update, remove, updateStatus } from '../repositories/serviceTypeRepository.js';

export async function getAllServiceTypes(req, res) {
    const { status, top } = req.query;
    const filter = {};
    if (status !== undefined) filter.status = Number(status);
    if (top !== undefined) filter.top = Math.max(1, parseInt(top, 10) || 1);
    const allServiceTypes = await findAll(filter);
    res.status(200).json(allServiceTypes);
}

export async function createServiceType(req, res) {
    const newServiceType = req.body;

    if (!newServiceType) {
        return res.status(400).json({ error: 'Service Type data is required' });
    }

    if (!newServiceType.name || !newServiceType.description || !newServiceType.category) {
        return res.status(400).json({
            error: 'name, description, and category are required fields'
        });
    }

    await create(newServiceType);
    return res.status(201).json({ message: "Service Type created" });
}

export async function getServiceTypeById(req, res) {
    const serviceType = await findById(req.params.id);
    res.status(200).json(serviceType);
}

export async function updateServiceType(req, res) {
    const id = req.params.id;
    const serviceTypeData = req.body;

    if (!serviceTypeData || Object.keys(serviceTypeData).length === 0) {
        return res.status(400).json({ error: "Update data cannot be empty" });
    }

    await update(id, serviceTypeData);
    res.status(200).json({ message: "Service Type updated" });
}

export async function deleteServiceType(req, res) {
    await remove(req.params.id);
    res.status(200).json({ message: "Service Type deleted" });
}

export async function updateServiceTypeStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    if (status === undefined || status === null) {
        return res.status(400).json({ error: "Active is required" });
    }

    const updated = await updateStatus(id, status);
    
    if (!updated) {
        return res.status(404).json({ error: "Service Type not found" });
    }

    res.status(200).json({ message: "Service Type status updated" });
}
