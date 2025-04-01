import CatArticle from '../db/models/CatArticle.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getCatArticle = async ({ page, perPage, sortBy, sortOrder,
}) => {
  try {
    page = parseInt(page, 10); 
    perPage = parseInt(perPage, 10);
    const skip = (page - 1) * perPage;

    const totalItems = await CatArticle.find().countDocuments();

    const items = await CatArticle.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage)
    ;

    const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData(
      totalItems,
      page,
      perPage,
  );

        return {
          items,
          page,
          perPage,
          totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
        };
    } catch (error) {
        throw new Error('Error fetching blog from the database');
    }
    
  };

  export const getOneCatArticle = (data) => CatArticle.findOne(data);