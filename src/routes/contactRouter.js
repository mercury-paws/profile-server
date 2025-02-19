import { Router } from 'express';
import {
    getAllContactsController,
    addContactController,
    addContactControllerConfirmation,
} from '../controllers/contact-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {contactAddSchema} from '../validation/contact-schema.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getAllContactsController));

contactRouter.post(
  '/addContact',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactRouter.get(
    '/addContact/verify',
    ctrlWrapper(addContactControllerConfirmation),
  );



export default contactRouter;