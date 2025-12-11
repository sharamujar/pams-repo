import database from '../config/database.js';

export async function findAll() {
    const [rows] = await database.promise().query('SELECT * FROM transactions');
    return rows;
}

export async function create(transactionData) {
    const [result] = await database.promise().query('INSERT INTO transactions SET ?', transactionData);
    return { id: result.insertId, ...transactionData };
}

export async function findById(id, callback) {
    const [rows] = await database.promise().query('SELECT * FROM transactions WHERE id = ?', [id]);
    return rows[0];
}

export async function update(id, transactionData) {
    const [result] = await database.promise().query(
        'UPDATE transactions SET ? WHERE id = ?',
        [transactionData, id]
    );
    return { id, ...transactionData };
}

export async function remove(id) {
    const [result] = await database.promise().query('DELETE FROM transactions WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
