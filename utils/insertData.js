import { csvParsedData } from '../utils/csvParser.js';
import { createEmbedding } from '../src/services/embedding.service.js';

export function generateInsertDataSQL(schema, rowCount) {
  const { tableName, columns } = schema;
  const columnNames = Object.keys(columns);

  const placeholders = Array.from({ length: rowCount }, (_, rowIndex) => {
    const offset = rowIndex * columnNames.length;
    const row = columnNames.map((_, i) => `$${offset + i + 1}`);
    return `(${row.join(', ')})`;
  });

  const sql = `
    INSERT INTO "${tableName}" (${columnNames.map(c => `"${c}"`).join(', ')})
    VALUES ${placeholders.join(',\n')};
  `;

  return {
    sql,
    columns: columnNames
  };
}

function toVectorLiteral(v, expectedDim = 384) {
  if (v == null) return null;
  const arr = Array.from(v, Number);
  if (arr.length !== expectedDim) {
    throw new Error(`Embedding dimension ${arr.length} != ${expectedDim}`);
  }
  return `[${arr.join(',')}]`;
};
//method to check if there is data in db oor not
async function checkIfTableIsEmpty(pool, schema) {
  const result = await pool.query(`SELECT COUNT(*) FROM "${schema.tableName}";`);
  return parseInt(result.rows[0].count, 10) === 0;
}

export async function seedDataBase(pool, schema) {
  console.log('In seed Data base');

  const isEmpty = await checkIfTableIsEmpty(pool, schema);

  if (!isEmpty) {
    console.log(`Table "${schema.tableName}" already contains data. Skipping seeding.`);
    return;
  }
  const data = await csvParsedData(); // CSV parsed data
  console.log('csv data is parsed');

  // Adding embeddings to the data
  const updatedData = await Promise.all(data.map(async obj => ({
    ...obj,
    title_vector: toVectorLiteral(await createEmbedding(obj.title)),
    description_vector: toVectorLiteral(await createEmbedding(obj.description)),
    checktext_vector: toVectorLiteral(await createEmbedding(obj.checktext)),
    fixtext_vector: toVectorLiteral(await createEmbedding(obj.fixtext)),
  })));//after this we have data in form of key value objects

  if (!Array.isArray(updatedData) || updatedData?.length === 0) {
    console.warn(`No data found to seed "${schema.tableName}".`);
    return;
  }

  console.log('Before generating SQL');
  const { sql, columns } = generateInsertDataSQL(schema, updatedData?.length);
  console.log(sql);

  const values = updatedData.flatMap(record => columns.map(col => record[col]));

  try {
    console.log('Before query to DB');
    await pool.query(sql, values);
    console.log(`Table "${schema.tableName}" seeded successfully with ${updatedData.length} rows.`);
  } catch (err) {
    console.error(`Error seeding table "${schema.tableName}":`, err.message);
    throw err;
  }
}
