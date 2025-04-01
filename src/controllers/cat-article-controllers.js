import { getCatArticle, getOneCatArticle,
    // addComment,  updateComment
} from '../services/cat-article-services.js';
import { sortByConstants, sortOrderConstants } from '../constants/constants.js';
import createHttpError from 'http-errors';

export const getAllCatArtileController = async (req, res, next) => {
    const { page = 1 } = req.query;
    const sortBy = sortByConstants[2];
    const sortOrder = sortOrderConstants[0];
  
try {
    const data = await getCatArticle(
        {
            sortBy,
            sortOrder,
            page,
            perPage: 4,
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

export const getCatArticleByIdController = async (req, res, next) => {
    const { id } = req.params;
    const data = await getOneCatArticle({ _id: id});
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
