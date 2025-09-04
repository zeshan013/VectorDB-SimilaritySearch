import pool from '../../config/db.js';
import { CiscoSchema } from '../models/cisco.model.js';

const table = CiscoSchema.tableName;

export async function getAllRows() {
  const query = `SELECT "id","severity","title","description","iacontrols","ruleID","fixid","fixtext","checkid","checktext" FROM ${table}`;
  const { rows } = await pool.query(query);
  return rows;
}

// export async function searchByContent(q) {
//   const query = `
//     SELECT * FROM ${table}
//     WHERE title ILIKE $1 OR description ILIKE $1 OR checktext ILIKE $1 OR fixtext ILIKE $1
//     ORDER BY "updatedAt" DESC
//   `;
//   const { rows } = await pool.query(query, [`%${q}%`]);
//   return rows;
// }

// export async function getAllForFuzzy() {
//   const query = `SELECT * FROM ${table}`;
//   const { rows } = await pool.query(query);
//   return rows;
// }
