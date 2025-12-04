import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM users');
    return rows;
}

export async function create(userData) {
    const [result] = await database.promise().query('INSERT INTO users SET ?', userData);
    return { id: result.insertId, ...userData };
}

export async function findById(id, callback) {
    const [rows] = await database.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, userData) {
    const [result] = await database.promise().query('UPDATE users SET ? WHERE id = ?', [userData, id]);
    return { id, ...userData };
}

export async function remove(id) {
    const [result] = await database.promise().query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
}