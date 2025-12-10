import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM benefit_eligibility');
    return rows;
}

export async function create(benefitData) {
    const [result] = await database.promise().query('INSERT INTO benefit_eligibility SET ?', benefitData);
    return { id: result.insertId, ...benefitData };
}

export async function findById(id) {
    const [rows] = await database.promise().query('SELECT * FROM benefit_eligibility WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, benefitData) {
    const [result] = await database.promise().query('UPDATE benefit_eligibility SET ? WHERE id = ?', [benefitData, id]);
    return { id, ...benefitData };
}

export async function remove(id) {
    const [result] = await database.promise().query('DELETE FROM benefit_eligibility WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
