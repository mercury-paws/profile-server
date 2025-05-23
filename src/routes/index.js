import { Router } from 'express';
import commentRouter from './commentRouter.js';
import contactRouter from './contactRouter.js';
import blogRouter from './blogRouter.js'
import catArticleRouter from './catArticleRouter.js'
import catCommentRouter from './catCommentRouter.js';
import blogCzRouter from './blogCzRouter.js';

const router = Router();

router.use('/comments', commentRouter);
router.use('/contacts', contactRouter);
router.use('/blog', blogRouter);
router.use('/blogcz', blogCzRouter);
router.use('/cat-article', catArticleRouter);
router.use('/cat-comments', catCommentRouter);

export default router;