import Blog from '../db/models/Blog.js';

  export const getBlog = async () => {
    try {
        const data = await Blog.find();
    return {
      data
    };
    } catch (error) {
        throw new Error('Error fetching blog from the database');
    }
    
  };

  export const getOneBlog = (data) => Blog.findOne(data);