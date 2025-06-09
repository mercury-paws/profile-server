import Blog from '../db/models/Blog.js';
import calcPaginationData from '../utils/calcPaginationData.js';

  export const getBlog = async ({ page, perPage, sortBy, sortOrder,
}) => {
    try {
      page = parseInt(page, 10); 
      perPage = parseInt(perPage, 10);
      const skip = (page - 1) * perPage;

      const totalItems = await Blog.find().countDocuments();

      const items = await Blog.find()
        // .sort({ [sortBy]: sortOrder })
        .sort({ order: -1 })
        .skip(skip)
        .limit(perPage);
      
      const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData(totalItems, page, perPage);

    return {
      items,
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      };
      
    } catch (error) {
        throw new Error('Error fetching blog from the database');
    }
    
  };

  export const getOneBlog = (data) => Blog.findOne(data);