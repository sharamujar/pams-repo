import { findAll, create, findById, update, remove } from '../repositories/serviceTypeRepository.js';

export async function getAllServiceTypes(req, res) {
    const allServiceTypes = await findAll();
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
