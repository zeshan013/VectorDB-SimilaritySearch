import express from 'express';
import { getAll, searchById, similaritySearch } from '../controller/cisco.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/search-id', searchById);
router.get('/search-similar', similaritySearch);

export default router;
