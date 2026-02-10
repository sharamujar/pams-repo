import database from "../config/database.js";

export async function findAll(filter = {}) {
  let query =
    "SELECT t.id, s.name, s.description, s.category, t.status, t.date_created, p.full_name as applicant_name, p.disability_type \
                FROM transactions t \
                JOIN service_types s ON t.service_id = s.id \
                JOIN persons p ON t.person_id = p.id";
  const params = [];

  if (filter.status !== undefined) {
    query += " WHERE t.status = ?";
    params.push(filter.status);
  }

  query += " ORDER BY t.date_created DESC";

  if (filter.top !== undefined) {
    const limit = Math.max(1, parseInt(filter.top, 10) || 1);
    query += " LIMIT ?";
    params.push(limit);
  }

  const [rows] = await database.promise().query(query, params);
  return rows;
}

export async function findAllByPersonId(personId, filter = {}) {
  let query =
    "SELECT t.id, s.name, s.description, s.category, t.status, t.date_created \
                FROM transactions t \
                JOIN service_types s ON t.service_id = s.id \
                WHERE t.person_id = ?";
  const params = [personId];

  if (filter.status !== undefined) {
    query += " AND status = ?";
    params.push(filter.status);
  }

  if (filter.top !== undefined) {
    const limit = Math.max(1, parseInt(filter.top, 10) || 1);
    query += " LIMIT ?";
    params.push(limit);
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

export async function updateStatus(id, status) {
  const [result] = await database
    .promise()
    .query("UPDATE transactions SET status = ? WHERE id = ?", [status, id]);

  return result.affectedRows > 0 ? { id, status } : null;
}

export async function remove(id) {
  const [result] = await database
    .promise()
    .query("DELETE FROM transactions WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
