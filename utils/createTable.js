export function generateCreateTableSQL(schema) {
  const { tableName, columns } = schema;

  const columnDefs = Object.entries(columns).map(([key, col]) => {
    let def = `"${key}" ${col.type}`;
    if (col.primaryKey) def += ' PRIMARY KEY';
    if (col.allowNull === false) def += ' NOT NULL';
    return def;
  });

  return `CREATE TABLE IF NOT EXISTS "${tableName}" (\n  ${columnDefs.join(',\n  ')}\n);`;
}

export async function createTable(pool, schema) {
  const sql = generateCreateTableSQL(schema);
  try {
    await pool.query(sql);
    console.log(`Table "${schema.tableName}" created SuccesFully`);
  } catch (err) {
    console.error(`Error creating table "${schema.tableName}":`, err.message);
    throw err;
  }
}
