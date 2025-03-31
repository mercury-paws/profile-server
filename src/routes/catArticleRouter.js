import { Router } from 'express';
import {
    getAllCatArtileController,
    getCatArticleByIdController,
} from '../controllers/cat-article-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';


const catArticleRouter = Router();

catArticleRouter.get('/', ctrlWrapper(getAllCatArtileController));

catArticleRouter.get('/:id', isValidId, ctrlWrapper(getCatArticleByIdController));

export default catArticleRouter;