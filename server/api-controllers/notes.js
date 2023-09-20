import mongoose from "mongoose";
import Note from "../models/notes.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getNotes = async (req, res) => {
    try {
        let user_id = req.user.id;
        const user_notes = await Note.find({ user: user_id });
        res.json(user_notes);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content, user: req.user.id });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content } = req.body;
        let updates = {};
        if(title) {updates.title = title;}
        if(content) {updates.content = content;}

        let existingNote = await Note.findById(req.params.id);
        if(!existingNote) {
            return res.status(404).json({error: "Note not found"});
        }
        if(existingNote.user.toString() !== req.user.id) {
            return res.status(405).json({error: "Cannot update the note"});
        }

        existingNote = await Note.findByIdAndUpdate(req.params.id, {$set: updates}, {new: true});
        res.status(201).json(existingNote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        let existingNote = await Note.findById(req.params.id);
        if(!existingNote) {
            return res.status(404).json({error: "Note not found"});
        }
        if(existingNote.user.toString() !== req.user.id) {
            return res.status(405).json({error: "Cannot delete the note"});
        }

        let deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.status(201).json({message: "Note has been deleted", deletedNote});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}