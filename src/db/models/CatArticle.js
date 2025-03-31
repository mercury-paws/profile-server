import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import {validateString } from '../../constants/constants.js';

const catArticleSchema = new Schema(
  {
    title: {
        type: String,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 20,
        validate: validateString,
        required: true,
      },
      header:{
        type: String,
        required: true,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 150,
        validate: validateString,
        unique: false,
      },
      text:{
        type: String,
        required: true,
        minLength: [3, 'Must be at least 3, got {VALUE}'],
        maxLength: 1500,
        validate: validateString,
        unique: false,
      },
      date:{
        type: String,
        required: true,
        unique: true,
      },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

catArticleSchema.post('save', mongooseSaveError);
catArticleSchema.pre('findOneAndUpdate', setUpdateSettings);
catArticleSchema.post('findOneAndUpdate', mongooseSaveError);

const CatArticle = model('catarticle', catArticleSchema);
export default CatArticle;