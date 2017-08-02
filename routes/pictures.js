import express from 'express';
import { getImages } from '../controllers/pictures';

const router = express.Router();

//GET
router.get('/', getImages);

export default router;