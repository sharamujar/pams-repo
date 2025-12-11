import { findAll, create, findById, update, remove } from '../repositories/serviceTypeRepository.js';

export async function getAllServiceTypes(req, res) {
    var allServiceTypes = await findAll();
    res.status(200).json(allServiceTypes);
}

export async function createServiceType(req, res) {
    var newServiceType = req.body;

    if (!newServiceType) {
        return res.status(400).json({ error: 'Service Type data is required' });
    }

    if (!newServiceType.service_name || !newServiceType.description || !newServiceType.category) {
        return res.status(400).json({
            error: 'service_name, description, and category are required fields'
        });
    }

    await create(newServiceType);
    return res.status(201);
}

export async function getServiceTypeById(req, res) {
    var serviceType = await findById(req.params.id);
    return res.status(200).json(serviceType);
}

export async function updateServiceType(id, serviceTypeData) {
    await update(id, serviceTypeData);
    return res.status(200);
}

export async function deleteServiceType(req, res) {
    await remove(req.params.id);
    return res.status(200);
}
