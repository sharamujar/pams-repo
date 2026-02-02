import database from "../config/database.js";

export async function findAll(filter = {}) {
  let query =
    "SELECT t.id, s.name, s.description, s.category, t.status, p.full_name as applicant_name \
                FROM transactions t \
                JOIN service_types s ON t.service_id = s.id \
                JOIN persons p ON t.person_id = p.id";
  const params = [];

  if (filter.status !== undefined) {
    query += " WHERE status = ?";
    params.push(filter.status);
  }

  const [rows] = await database.promise().query(query, params);
  return rows;
}

export async function findAllByPersonId(personId, filter = {}) {
  let query =
    "SELECT t.id, s.name, s.description, s.category, t.status \
                FROM transactions t \
                JOIN service_types s ON t.service_id = s.id \
                WHERE t.person_id = ?";
  const params = [personId];

  if (filter.status !== undefined) {
    query += " AND status = ?";
    params.push(filter.status);
  }

  const [rows] = await database.promise().query(query, params);
  return rows;
}

export async function create(transactionData) {
  const [result] = await database
    .promise()
    .query("INSERT INTO transactions SET ?", transactionData);
  return { id: result.insertId, ...transactionData };
}

export async function findById(id) {
  const [rows] = await database
    .promise()
    .query("SELECT * FROM transactions WHERE id = ?", [id]);
  return rows[0] || null;
}

export async function update(id, transactionData) {
  if (!transactionData || Object.keys(transactionData).length === 0) {
    throw new Error("Update data cannot be empty");
  }

  const [result] = await database
    .promise()
    .query("UPDATE transactions SET ? WHERE id = ?", [transactionData, id]);

  return result.affectedRows > 0 ? { id, ...transactionData } : null;
}

export async function remove(id) {
  const [result] = await database
    .promise()
    .query("DELETE FROM transactions WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
