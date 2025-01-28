import Comment from '../db/models/Comment.js';

  export const getComments = async () => {
    try {
        const data = await Comment.find({ verify: true });
    return {
      data
    };
    } catch (error) {
        throw new Error('Error fetching comments from the database');
    }
    
  };

  export const addComment = (data) => Comment.create(data);