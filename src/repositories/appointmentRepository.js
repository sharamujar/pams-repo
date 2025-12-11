import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query(
        'SELECT * FROM appointments'
    );
    return rows;
}

export async function create(appointmentData) {
    const [result] = await database.promise().query(
        'INSERT INTO appointments SET ?',
        appointmentData
    );
    return { id: result.insertId, ...appointmentData };
}

export async function findById(id) {
    const [rows] = await database
        .promise()
        .query('SELECT * FROM appointments WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, appointmentData) {
    
    Object.keys(appointmentData).forEach(key => {
        if (appointmentData[key] === undefined) {
            delete appointmentData[key];
        }
    });

    
    const fields = Object.keys(appointmentData)
        .map(key => `${key} = ?`)
        .join(', ');

    const values = Object.values(appointmentData);

    const [result] = await database
        .promise()
        .query(
            `UPDATE appointments SET ${fields} WHERE id = ?`,
            [...values, id]
        );

    return { id, ...appointmentData };
}

export async function remove(id) {
    const [result] = await database
        .promise()
        .query('DELETE FROM appointments WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
