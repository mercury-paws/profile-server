import { Router } from 'express';
import {
    getAllBlogCzController,
    getBlogCzByIdController,
    // addCommentController
} from '../controllers/blogCz-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
// import validateBody from '../middlewares/validateBody.js';
// import {blogSchema} from '../validation/blog-schema.js';

const blogCzRouter = Router();

blogCzRouter.get('/', ctrlWrapper(getAllBlogCzController));

blogCzRouter.get('/:id', isValidId, ctrlWrapper(getBlogCzByIdController));

// blogRouter.post(
//   '/addComment',
//   validateBody(blogSchema),
//   ctrlWrapper(addBlogController),
// );

export default blogCzRouter;