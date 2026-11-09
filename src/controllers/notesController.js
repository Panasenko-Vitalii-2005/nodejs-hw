import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export async function getAllNotes(req, res) {
  const notes = await Note.find();
  res.status(200).json(notes);
}

export async function getNoteById(req, res) {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
}

export async function createNote(req, res) {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
}

export async function updateNote(req, res) {
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    { $set: req.body },
    { returnDocument: 'after', runValidators: true },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
}

export async function deleteNote(req, res) {
  const note = await Note.findByIdAndDelete(req.params.noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
}
