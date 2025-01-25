import { Router } from 'express';
import {
    getAllCommentsController,
    addCommentController
} from '../controllers/comment-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {commentAddSchema} from '../validation/comment-schema.js';

const commentRouter = Router();

commentRouter.get('/', ctrlWrapper(getAllCommentsController));

commentRouter.post(
  '/addComment',
  validateBody(commentAddSchema),
  ctrlWrapper(addCommentController),
);

export default commentRouter;