import database from '../config/database.js';

export async function findAllPersons() {
    const [rows] = await database.promise().query('SELECT * FROM persons');
    return rows;
}

export async function createPWD(personData) {
    const [result] = await database.promise().query('INSERT INTO persons SET ?', personData);
    return { id: result.insertId, ...personData };
}

export async function findPersonById(id) {
    const [rows] = await database.promise().query('SELECT * FROM persons WHERE id = ?', [id]);
    return rows[0];
}

export async function updatePerson(id, personData) {
    const [result] = await database.promise().query('UPDATE persons SET ? WHERE id = ?', [personData, id]);
    return { id, ...personData };
}

export async function removePerson(id) {
    const [result] = await database.promise().query('DELETE FROM persons WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
