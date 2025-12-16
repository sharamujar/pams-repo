import { findAll, create, findById, findByUsername, update, remove } from '../repositories/userRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = process.env.JWT_SECRET;

export async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await findByUsername(username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  return res.status(200).json({ token });
};

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
    newUser.password_hash = await bcrypt.hash(newUser.password, 10);
    const { password, ...newUserRecord } = newUser;
    await create(newUserRecord);
    return res.status(201).json({ message: 'User created successfully' });
}

export async function getUserById(req, res) {
    var user = await findById(req.params.id);
    return res.status(200).json(user);
}

export async function updateUser(id, userData) {
    await update(id, userData);
    return res.status(200).json({ message: 'User updated successfully' });
}

export async function deleteUser(req, res) {
    await remove(req.params.id);
    return res.status(200).json({ message: 'User deleted successfully' });
}