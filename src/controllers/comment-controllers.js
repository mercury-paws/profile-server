
import { getComments,addComment,} from '../services/comment-services.js';
import Comment from '../db/models/Comment.js';
import handlebars from 'handlebars';

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
  // const newComment = await addComment(req.body);
  console.log(req.body);

  const emailTemplateSource = await fs.readFile(verifyEmailPath, 'utf-8');
  const emailTemplate = handlebars.compile(emailTemplateSource);

  const html = emailTemplate({
    app_domain,
  });

  const verifyEmail = {
    subject: 'Verify Email',
    to: email,
    html,
    // `<a target="_blank" href="${app_domain}/auth/verify?token=${token}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: 201,
    message: 'Successfully added comment!',
    data,
  });
};
