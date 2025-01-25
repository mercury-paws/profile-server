import { Router } from 'express';
import commentRouter from './commentRouter.js';


const router = Router();

router.use('/comments', commentRouter);

export default router;