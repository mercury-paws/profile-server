import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import {validateEmail, validateString } from '../../constants/constants.js';

const catCommentSchema = new Schema(
  {
    name: {
        type: String,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 20,
        validate: validateString,
        required: true,
      },
      comment:{
        type: String,
        required: true,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 250,
        unique: false,
    },
      email: {
        type: String,
        required: true,
        validate: validateEmail,
        unique: true,
      },
      verify: {
        type: Boolean,
        default: false,
        required: true,
    },
      articleId: {
      type: Schema.Types.ObjectId,
      ref: 'catarticle',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

catCommentSchema.post('save', mongooseSaveError);
catCommentSchema.pre('findOneAndUpdate', setUpdateSettings);
catCommentSchema.post('findOneAndUpdate', mongooseSaveError);

const CatComment = model('catcomment', catCommentSchema);
export default CatComment;