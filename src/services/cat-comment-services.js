import CatComment from "../db/models/CatComments.js";

  export const getCatComments = async () => {
    try {
        const data = await CatComment.find({ verify: true });
    return {
      data
    };
    } catch (error) {
        throw new Error('Error fetching comments from the database');
    }
    
  };

  export const addCatComment = (data) => CatComment.create(data);

  export const findCatComment = (data) => CatComment.findOne(data);

  export const updateCatComment = (filter, data) => CatComment.findOneAndUpdate(filter, data);