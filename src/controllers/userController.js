import { findAll, create, findById, update, remove } from '../repositories/userRepository.js';

export async function getAllUsers() {
    return await findAll();
}

export async function createUser(userData) {
    return await create(userData);
}

export async function getUserById(id) {
    return await findById(id);
}

export async function updateUser(id, userData) {
    return await update(id, userData);
}

export async function deleteUser(id) {
    return await remove(id);
}