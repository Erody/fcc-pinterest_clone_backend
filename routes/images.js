import express from 'express';
import { getImages, addImage } from '../controllers/pictures';
import { catchErrors } from '../handlers/errorHandlers';


const router = express.Router();

//POST
router.post('/', getImages);
router.post('/addImage', catchErrors(addImage));

export default router;