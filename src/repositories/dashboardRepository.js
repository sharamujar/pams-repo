import database from "../config/database.js";

export async function getCounts() {
  const db = database.promise();

  const [
    [transactionsCreatedTodayRows],
    [transactionsStatusOneRows],
    [activeServiceTypesRows],
  ] = await Promise.all([
    db.query(
      "SELECT COUNT(*) as count FROM transactions WHERE DATE(date_created) = CURDATE()"
    ),
    db.query(
      "SELECT COUNT(*) as count FROM transactions WHERE status = 1"
    ),
    db.query(
      "SELECT COUNT(*) as count FROM service_types WHERE active = 1"
    ),
  ]);

  return {
    transactionsCreatedToday: transactionsCreatedTodayRows[0]?.count ?? 0,
    transactionsWithStatusOne: transactionsStatusOneRows[0]?.count ?? 0,
    activeServiceTypes: activeServiceTypesRows[0]?.count ?? 0,
  };
}
