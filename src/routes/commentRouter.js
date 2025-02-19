import { Router } from 'express';
import {
    getAllCommentsController,
    addCommentController,
    addCommentControllerConfirmation
} from '../controllers/comment-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {commentAddSchema} from '../validation/comment-schema.js';

const commentRouter = Router();

commentRouter.get('/', ctrlWrapper(getAllCommentsController));

commentRouter.get(
  '/addComment/verify',
  ctrlWrapper(addCommentControllerConfirmation),
);

commentRouter.post(
  '/addComment',
 
  validateBody(commentAddSchema),
  ctrlWrapper(addCommentController),
);

export default commentRouter;