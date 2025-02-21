import fs from 'node:fs/promises';
import { getContacts, addContact, findContact, updateContact} from '../services/contact-services.js';
import Contact from '../db/models/Contact.js';
import handlebars from 'handlebars';
import { TEMPLATES_DIR } from '../constants/path.js';
import path from 'node:path';
import { env } from '../utils/env.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from "jsonwebtoken"
import createHttpError from 'http-errors';

const jwt_secret = env('JWT_SECRET');
const app_domain = env('APP_DOMAIN', 'http://localhost:3000');
const contactMeEmailPath = path.join(TEMPLATES_DIR, 'contact-me.html');
const contactMeConfirmationEmailPath = path.join(TEMPLATES_DIR, 'confirmation.html');
const BASE_EMAIL = env('BASE_EMAIL');

export const getAllContactsController = async (req, res, next) => {
try {
    const data = await getContacts();
    res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
} catch (error) {
    next(error)
}
};


export const addContactController = async (req, res) => {

const timestamp = Date.now();
  const oldDataTimestamp = await Contact.find({ timestamp });
  const listOfExistingTimestamps = oldDataTimestamp.map((doc) => doc.timestamp);
  const { comment, name, email } = req.body;

  if (listOfExistingTimestamps.includes(String(timestamp))) {
    return res
      .status(400)
      .json({ status: 400, message: 'This time is already used' });
  }

  const data = await addContact({
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

  const emailTemplateSource = await fs.readFile(contactMeEmailPath, 'utf-8');
  const emailTemplate = handlebars.compile(emailTemplateSource);

  const html = emailTemplate({
    app_domain,
    comment: data.comment,
    name: data.name,
    email: data.email,
    token,
  });

  const verifyEmail = {
    subject: 'MP-platform contact me request',
    to: BASE_EMAIL,
    html,
  };

  const emailConfirmationTemplateSource = await fs.readFile(contactMeConfirmationEmailPath, 'utf-8');
  const emailConfirmationTemplate = handlebars.compile(emailConfirmationTemplateSource);

  const htmlConfirmation = emailConfirmationTemplate({
    app_domain,
    comment: data.comment,
    name: data.name,
    email: data.email,
    token,
  });

  const confirmationEmail = {
    subject: 'MP-platform confirmation',
    to: data.email,
    html: htmlConfirmation,
  };

  const confirmed = await sendEmail(verifyEmail);

  if(confirmed){
    await sendEmail(confirmationEmail);
  }
  

  res.status(201).json({
    status: 201,
    message: 'Successfully added contact!',
    data,
  });
};

export const addContactControllerConfirmation = async (req, res)=>{
  const { token } = req.query;
    try {
      const { id, email } = jwt.verify(token, jwt_secret);
      const comment = await findContact({ _id: id, email });
      if (!comment) {
        throw createHttpError(404, 'User not found');
      }
      await updateContact({ email }, { verify: true });
      res.status(200).json({ message: 'Contact verified successfully!' });
      } catch (error) {
      throw createHttpError(401, error.message);
    }
  };

