import database from '../config/database.js';

export async function findAll(filter = {}) {
    let query = 'SELECT * FROM service_types';
    const params = [];
    if (filter.status !== undefined) {
        query += ' WHERE active = ?';
        params.push(filter.status);
    }
    query += ' ORDER BY date_created DESC';
    if (filter.top !== undefined) {
        query += ' LIMIT ?';
        params.push(filter.top);
    }
    const [rows] = await database.promise().query(query, params);
    return rows;
}

export async function create(serviceTypeData) {
    const [result] = await database.promise().query('INSERT INTO service_types SET ?', serviceTypeData);
    return { id: result.insertId, ...serviceTypeData };
}

export async function findById(id) {
    const [rows] = await database.promise().query('SELECT * FROM service_types WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, serviceTypeData) {
    const [result] = await database.promise().query(
        'UPDATE service_types SET ? WHERE id = ?',
        [serviceTypeData, id]
    );
    return { id, ...serviceTypeData };
}

export async function remove(id) {
    const [result] = await database.promise().query(
        'DELETE FROM service_types WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

export async function updateStatus(id, active) {
    const [result] = await database.promise().query(
        'UPDATE service_types SET active = ? WHERE id = ?',
        [active, id]
    );
    return result.affectedRows > 0;
}
