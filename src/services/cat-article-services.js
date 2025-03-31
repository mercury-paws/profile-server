import CatArticle from '../db/models/CatArticle.js';

  export const getCatArticle = async () => {
    try {
        const data = await CatArticle.find();
    return {
      data
    };
    } catch (error) {
        throw new Error('Error fetching blog from the database');
    }
    
  };

  export const getOneCatArticle = (data) => CatArticle.findOne(data);