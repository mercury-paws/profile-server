import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import {validateString } from '../../constants/constants.js';

const blogSchema = new Schema(
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
        // validate: validateString,
        unique: true,
    },
    order: {
      type: Number,
      required: true, 
      unique: true    
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

blogSchema.post('save', mongooseSaveError);
blogSchema.pre('findOneAndUpdate', setUpdateSettings);
blogSchema.post('findOneAndUpdate', mongooseSaveError);

const Blogcz = model('blogcz', blogSchema);
export default Blogcz;