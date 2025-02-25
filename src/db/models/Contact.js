import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import {validateEmail, validateString } from '../../constants/constants.js';

const contactSchema = new Schema(
  {
    name: {
        type: String,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 20,
        validate: validateString,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: validateEmail,
        unique: false,
      },
      comment:{
        type: String,
        required: true,
        minLength: [10, 'Must be at least 10, got {VALUE}'],
        maxLength: 250,
        unique: false,
      },
      verify: {
        type: Boolean,
        default: false,
        required: true,
      },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', mongooseSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', mongooseSaveError);

const Contact = model('contact', contactSchema);
export default Contact;