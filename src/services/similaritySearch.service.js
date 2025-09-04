import pool from '../../config/db.js';
import { CiscoSchema } from '../models/cisco.model.js';
import { createEmbedding } from './embedding.service.js';

const table = CiscoSchema.tableName;
export async function similaritySearch(q,field) {
    let orderBy;
    let where;
    let threshold='0.7';
    if(field==='description'){
        orderBy=`ORDER BY
      "description_vector"<=> $1::vector`
        where=`WHERE
      "description_vector" <=> $1::vector < ${threshold}`
    }else if(field==='title'){
        orderBy=`ORDER BY
        "title_vector"      <=> $1::vector`
        where=`WHERE
        "title_vector"      <=> $1::vector < ${threshold}`
    }else if(field==='fixtext'){
        orderBy=`ORDER BY
        "fixtext_vector"    <=> $1::vector`
        where=`WHERE
        "fixtext_vector"      <=> $1::vector < ${threshold}`
    }else if(field==='checktext'){
        orderBy=`ORDER BY
      "checktext_vector"    <=> $1::vector`
        where=`WHERE
        "checktext_vector"      <=> $1::vector < ${threshold}`
    }else{
        orderBy=`ORDER BY LEAST(
    "description_vector" <=> $1::vector,
    "checktext_vector"   <=> $1::vector,
    "fixtext_vector"     <=> $1::vector,
    "title_vector"       <=> $1::vector) ASC `;
        where=`WHERE
      "title_vector"      <=> $1::vector < ${threshold} OR
      "description_vector"<=> $1::vector < ${threshold} OR
      "checktext_vector"  <=> $1::vector < ${threshold} OR
      "fixtext_vector"    <=> $1::vector < ${threshold} `;
    }
  const sql = `
    SELECT "id","severity","title","description","iacontrols","ruleID","fixid","fixtext","checkid","checktext"
    FROM ${table}
    ${where}
    ${orderBy}
    LIMIT 5`;

  const embedding = await createEmbedding(q);
  const { rows } = await pool.query(sql, [JSON.stringify(embedding)]);
  return rows;
}