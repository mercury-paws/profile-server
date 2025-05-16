import { getBlogCz, getOneBlogCz,
    // addComment,  updateComment
} from '../services/blogCz-services.js';
import { sortByConstants, sortOrderConstants } from '../constants/constants.js';
import createHttpError from 'http-errors';

export const getAllBlogCzController = async (req, res, next) => {
  const { page = 1 } = req.query;
    const sortBy = sortByConstants[2];
    const sortOrder = sortOrderConstants[0];
  
try {
    const data = await getBlogCz(
        {
            sortBy,
            sortOrder,
            page,
            perPage: 5,
          }
    );
  res.json({
    status: 200,
    message: 'Successfully found blog',
    data,
  });
} catch (error) {
    next(error)
}
};

export const getBlogCzByIdController = async (req, res, next) => {
    const { id } = req.params;
    const data = await getOneBlogCz({ _id: id});
    console.log({ id});
    if (!data) {
      throw createHttpError(
        404,
        `Information about blog article with id ${id} not found`,
      );
    }
    res.json({
      status: 200,
      message: `Successfully found information about blog article with id ${id}`,
      data,
    });
  };
