import {getAllRows} from '../services/getAll.service.js';
import {searchById as searchByIdService} from '../services/searchById.service.js'
import {similaritySearch as similaritySearchService} from '../services/similaritySearch.service.js';


export async function getAll(req, res) {
  try {
    const data = await getAllRows();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function searchById(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  try {
    const results = await searchByIdService(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function similaritySearch(req, res) {
  const {q,field} = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });
console.log(field);
  try {
    const results = await similaritySearchService(q,field);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
