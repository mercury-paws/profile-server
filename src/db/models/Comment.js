import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import {validateEmail, validateString } from '../../constants/constants.js';
const commentSchema = new Schema(
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
        unique: true,
      },
      comment:{
        type: String,
        required: true,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
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

commentSchema.post('save', mongooseSaveError);
commentSchema.pre('findOneAndUpdate', setUpdateSettings);
commentSchema.post('findOneAndUpdate', mongooseSaveError);

const Comment = model('comment', commentSchema);
export default Comment;