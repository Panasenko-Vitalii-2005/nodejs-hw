import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteFields = {
  title: Joi.string().trim().min(1),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
};

const noteIdParams = Joi.object({
  noteId: Joi.string()
    .required()
    .custom((value, helpers) =>
      isValidObjectId(value) ? value : helpers.error('any.invalid'),
    ),
});

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: noteFields.tag,
    search: Joi.string().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: noteIdParams,
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    ...noteFields,
    title: noteFields.title.required(),
  }).required(),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: noteIdParams,
  [Segments.BODY]: Joi.object(noteFields).min(1).required(),
};
