import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM system_logs');
    return rows;
}

export async function create(logData) {
    const [result] = await database.promise().query('INSERT INTO system_logs SET ?', logData);
    return { id: result.insertId, ...logData };
}

export async function findById(id) {
    const [rows] = await database.promise().query('SELECT * FROM system_logs WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, logData) {
    const [result] = await database.promise().query(
        'UPDATE system_logs SET ? WHERE id = ?',
        [logData, id]
    );
    return { id, ...logData };
}

export async function remove(id) {
    const [result] = await database.promise().query(
        'DELETE FROM system_logs WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}
