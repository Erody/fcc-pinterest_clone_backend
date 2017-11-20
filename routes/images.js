import express from 'express';
import { getImages, addImage, voteOnImage } from '../controllers/pictures';
import { catchErrors } from '../handlers/errorHandlers';
import isAuthenticated from '../middleware/isAuthenticated';


const router = express.Router();

//POST
router.post('/', getImages);
router.post('/addImage', isAuthenticated, catchErrors(addImage));
router.post('/vote', isAuthenticated, catchErrors(voteOnImage));

export default router;