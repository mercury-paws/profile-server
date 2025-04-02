import { Router } from 'express';
import {
    getAllCatCommentsController,
    addCatCommentController,
    addCatCommentControllerConfirmation
} from '../controllers/cat-comment-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {catCommentAddSchema} from '../validation/comment-schema.js';

const catCommentRouter = Router();

catCommentRouter.get('/', ctrlWrapper(getAllCatCommentsController));

catCommentRouter.get(
  '/addComment/verify',
  ctrlWrapper(addCatCommentControllerConfirmation),
);

catCommentRouter.post(
  '/addComment',
 
  validateBody(catCommentAddSchema),
  ctrlWrapper(addCatCommentController),
);

export default catCommentRouter;