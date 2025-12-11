import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM service_types');
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
