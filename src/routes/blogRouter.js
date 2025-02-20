import { Router } from 'express';
import {
    getAllBlogController,
    getBlogByIdController,
    // addCommentController
} from '../controllers/blog-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
// import validateBody from '../middlewares/validateBody.js';
// import {blogSchema} from '../validation/blog-schema.js';

const blogRouter = Router();

blogRouter.get('/', ctrlWrapper(getAllBlogController));

blogRouter.get('/:id', isValidId, ctrlWrapper(getBlogByIdController));

// blogRouter.post(
//   '/addComment',
//   validateBody(blogSchema),
//   ctrlWrapper(addBlogController),
// );

export default blogRouter;