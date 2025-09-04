import pool from '../../config/db.js';
import { CiscoSchema } from '../models/cisco.model.js';

const table = CiscoSchema.tableName;
export async function searchById(q) {
    const query = `SELECT "id","severity","title","description","iacontrols","ruleID","fixid","fixtext","checkid","checktext" FROM ${table}
     WHERE id ILIKE $1 OR "ruleID" ILIKE $1 OR "fixid" ILIKE $1 OR "checkid" ILIKE $1`;
    const { rows } = await pool.query(query, [q]);
    return rows;
}