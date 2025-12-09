import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM announcements');
    return rows;
}

export async function create(announcementData) {
    const [result] = await database.promise().query(
        'INSERT INTO announcements SET ?',
        announcementData
    );

    return { id: result.insertId, ...announcementData };
}

export async function findById(id) {
    const [rows] = await database.promise().query(
        'SELECT * FROM announcements WHERE id = ?',
        [id]
    );

    return rows[0];
}

export async function update(id, announcementData) {
    const [result] = await database.promise().query(
        'UPDATE announcements SET ? WHERE id = ?',
        [announcementData, id]
    );

    return { id, ...announcementData };
}

export async function remove(id) {
    const [result] = await database.promise().query(
        'DELETE FROM announcements WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
}
