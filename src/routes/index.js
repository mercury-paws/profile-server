import { Router } from 'express';
import commentRouter from './commentRouter.js';
import contactRouter from './contactRouter.js';
import blogRouter from './blogRouter.js'


const router = Router();

router.use('/comments', commentRouter);
router.use('/contacts', contactRouter);
router.use('/blog', blogRouter);

export default router;