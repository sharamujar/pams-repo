import { findAll, create, findById, update, remove } from '../repositories/userRepository.js';

export async function getAllUsers(req, res) {
    var allUsers = await findAll();
    res.status(200).json(allUsers);
}
    
export async function createUser(req, res) {
    var newUser = req.body;
    if (!newUser) {
        return res.status(400).json({ error: 'User data is required' });
    }
    if (!newUser.full_name || !newUser.role || !newUser.username) {
        return res.status(400).json({ error: 'full_name, role, and username are required fields' });
    }
    await create(newUser);
    return res.status(201);
}

export async function getUserById(req, res) {
    var user = await findById(req.params.id);
    return res.status(200).json(user);
}

export async function updateUser(id, userData) {
    await update(id, userData);
    return res.status(200);
}

export async function deleteUser(req, res) {
    await remove(req.params.id);
    return res.status(200);
}