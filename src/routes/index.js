import { Router } from 'express';
import commentRouter from './commentRouter.js';
import contactRouter from './contactRouter.js';


const router = Router();

router.use('/comments', commentRouter);
router.use('/contacts', contactRouter);

export default router;