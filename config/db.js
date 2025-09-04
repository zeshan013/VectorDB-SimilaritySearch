import pg from 'pg';
import dotenv from 'dotenv';
import { CiscoSchema } from '../src/models/cisco.model.js';
import { createTable } from '../utils/createTable.js';
import { seedDataBase } from '../utils/insertData.js';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'cisco',
});
//create table
async function initDatabase() {
  try {
    await createTable(pool, CiscoSchema);
    console.log(' Database is ready');
  } catch (err) {
    console.error(' Database initialization failed:', err.message);
    process.exit(1);
  }
}

await initDatabase();
//insert data into Db
await seedDataBase(pool,CiscoSchema);

export default pool;
