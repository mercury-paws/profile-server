import { Router } from 'express';
import commentRouter from './commentRouter.js';
import contactRouter from './contactRouter.js';
import blogRouter from './blogRouter.js'
import catArticleRouter from './catArticleRouter.js'


const router = Router();

router.use('/comments', commentRouter);
router.use('/contacts', contactRouter);
router.use('/blog', blogRouter);
router.use('/cat-article', catArticleRouter);

export default router;