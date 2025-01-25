
import { getComments,addComment,} from '../services/comment-services.js';
import Comment from '../db/models/Comment.js';

export const getAllCommentsController = async (req, res, next) => {
try {
    const data = await getComments();
  res.json({
    status: 200,
    message: 'Successfully found comments',
    data,
  });
} catch (error) {
    next(error)
}

  
};


export const addCommentController = async (req, res) => {

const timestamp = Date.now();
  const oldDataTimestamp = await Comment.find({ timestamp });
  
  const listOfExistingTimestamps = oldDataTimestamp.map((doc) => doc.timestamp);
  
  const { comment, name, email } = req.body;

  if (listOfExistingTimestamps.includes(String(timestamp))) {
    return res
      .status(400)
      .json({ status: 400, message: 'This time is already used' });
  }

  const data = await addComment({
    timestamp,
    comment,
    name,
    email
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully added comment!',
    data,
  });
};
