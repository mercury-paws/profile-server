import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import {validateEmail } from '../../constants/constants.js';
const commentSchema = new Schema(
  {
    name: {
        type: String,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 20,
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
        maxLength: 150,
        unique: false,
      }
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