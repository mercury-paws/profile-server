import fs from 'node:fs/promises';
import { getCatComments,addCatComment, findCatComment, updateCatComment} from '../services/cat-comment-services.js';
import CatComment from '../db/models/CatComments.js';
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

export const getAllCatCommentsController = async (req, res, next) => {
  try {
  const { id } = req.params;
    const data = await getCatComments(id);

  res.json({
    status: 200,
    message: 'Successfully found comments',
    data,
  });
} catch (error) {
    next(error)
}

  
};


export const addCatCommentController = async (req, res) => {

const timestamp = Date.now();
  const oldDataTimestamp = await CatComment.find({ timestamp });
  const listOfExistingTimestamps = oldDataTimestamp.map((doc) => doc.timestamp);
  const { comment, name, email } = req.body;
 const { id } = req.params;
  if (listOfExistingTimestamps.includes(String(timestamp))) {
    return res
      .status(400)
      .json({ status: 400, message: 'This time is already used' });
  }

  const data = await addCatComment({
    timestamp,
    comment,
    name,
    email, 
    articleId: id,
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

export const addCatCommentControllerConfirmation = async (req, res)=>{
  const { token } = req.query;
    try {
      const { id, email } = jwt.verify(token, jwt_secret);
      const comment = await findCatComment({ _id: id, email });
      if (!comment) {
        throw createHttpError(404, 'User not found');
      }
      await updateCatComment({ email }, { verify: true });
      res.status(200).json({ message: 'Comment verified successfully!' });
      } catch (error) {
      throw createHttpError(401, error.message);
    }
  };

