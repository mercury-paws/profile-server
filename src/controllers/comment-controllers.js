import fs from 'node:fs/promises';
import { getComments,addComment, findComment, updateComment} from '../services/comment-services.js';
import Comment from '../db/models/Comment.js';
import handlebars from 'handlebars';
import { TEMPLATES_DIR } from '../constants/path.js';
import path from 'node:path';
import { env } from '../utils/env.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from "jsonwebtoken"
import createHttpError from 'http-errors';

const jwt_secret = env('JWT_SECRET');
const app_domain = env('APP_DOMAIN', 'http://localhost:3000');
const verifyEmailPath = path.join(TEMPLATES_DIR, 'verify-comment.html');
const confirmationEmailPath = path.join(TEMPLATES_DIR, 'confirmation.html');
const BASE_EMAIL = env('BASE_EMAIL');

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

  const payload = {
    id: data._id,
    email,
  };
  
  const token = jwt.sign(payload, jwt_secret);

  console.log(req.body);

  const emailTemplateSource = await fs.readFile(verifyEmailPath, 'utf-8');
  const emailTemplate = handlebars.compile(emailTemplateSource);

  const html = emailTemplate({
    app_domain,
    comment: data.comment,
    name: data.name,
    email: data.email,
    token,
  });

  const verifyEmail = {
    subject: 'MP-platform comment verification',
    to: BASE_EMAIL,
    html,
  };

  const emailConfirmationTemplateSource = await fs.readFile(confirmationEmailPath, 'utf-8');
  const emailConfirmationTemplate = handlebars.compile(emailConfirmationTemplateSource);

  const htmlConfirmation = emailConfirmationTemplate({
    comment: data.comment,
    name: data.name,
    email: data.email,
  });

  const confirmationEmail = {
    subject: 'MP-platform comment verification',
    to: data.email,
    html: htmlConfirmation,
  };

  const confirmed = await sendEmail(verifyEmail);

  if(confirmed){
    await sendEmail(confirmationEmail);
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully added comment!',
    data,
  });
};

export const addCommentControllerConfirmation = async (req, res)=>{
  const { token } = req.query;
    try {
      const { id, email } = jwt.verify(token, jwt_secret);
      const comment = await findComment({ _id: id, email });
      if (!comment) {
        throw createHttpError(404, 'User not found');
      }
      await updateComment({ email }, { verify: true });
      res.status(200).json({ message: 'Comment verified successfully!' });
      } catch (error) {
      throw createHttpError(401, error.message);
    }
  };

