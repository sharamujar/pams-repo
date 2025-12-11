import database from '../config/database.js';

const ALLOWED_LOG_COLUMNS = [
  'user_id',
  'action',
  'timestamp',
  'module',
  'affected_id',
  'table',       
  'notes'
];

export async function findAll() {
  const [rows] = await database.promise().query('SELECT * FROM system_logs');
  return rows;
}

export async function create(logData) {
  
  Object.keys(logData).forEach(key => {
    if (logData[key] === undefined) delete logData[key];
  });

  const [result] = await database.promise().query(
    'INSERT INTO system_logs SET ?',
    logData
  );

  return { id: result.insertId, ...logData };
}

export async function findById(id) {
  const [rows] = await database.promise().query(
    'SELECT * FROM system_logs WHERE id = ?',
    [id]
  );
  return rows[0];
}

export async function update(id, logData) {
  
  Object.keys(logData).forEach(key => {
    if (logData[key] === undefined) delete logData[key];
  });

  
  const keys = Object.keys(logData).filter(key => ALLOWED_LOG_COLUMNS.includes(key));

  if (keys.length === 0) {
    
    return { id };
  }

  
  const setClause = keys.map(key => `\`${key}\` = ?`).join(', ');
  const values = keys.map(key => logData[key]);

  const sql = `UPDATE system_logs SET ${setClause} WHERE id = ?`;

  const [result] = await database.promise().query(sql, [...values, id]);

  return { id, ...logData };
}

export async function remove(id) {
  const [result] = await database.promise().query(
    'DELETE FROM system_logs WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}
