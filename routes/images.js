import express from 'express';
import { getImages } from '../controllers/pictures';

const router = express.Router();

//POST
router.post('/', getImages);


export default router;