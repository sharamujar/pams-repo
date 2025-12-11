import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM yearly_archive');
    return rows;
}

export async function create(recordData) {
    const [result] = await database.promise().query('INSERT INTO yearly_archive SET ?', recordData);
    return { id: result.insertId, ...recordData };
}

export async function findById(id) {
    const [rows] = await database.promise().query('SELECT * FROM yearly_archive WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, recordData) {
    const [result] = await database.promise().query('UPDATE yearly_archive SET ? WHERE id = ?', [recordData, id]);
    return { id, ...recordData };
}

export async function remove(id) {
    const [result] = await database.promise().query('DELETE FROM yearly_archive WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
