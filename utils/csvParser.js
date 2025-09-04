import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../data/data.csv');

export async function csvParsedData() {
    const data = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (r) => data.push({
                id: r.id,
                severity: r.severity,
                title: r.title,
                description: r.description || null,
                iacontrols: r.iacontrols || null,
                ruleID: r.ruleID || null,
                fixid: r.fixid || null,
                fixtext: r.fixtext || null,
                checkid: r.checkid || null,
                checktext: r.checktext || null,
            }))
            .on('end', resolve)
            .on('error', reject);
    });
    return data;
}