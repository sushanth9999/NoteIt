import express from 'express';
import { addNote, deleteNote, getNotes, updateNote } from '../api-controllers/notes.js';
import { fetchUserInfo } from '../middleware/fetchUserInfo.js';
import { body } from 'express-validator';
const router = express.Router();

router.get('/', (req, res) => { res.send("At Notes") });
router.get('/getnotes', fetchUserInfo, getNotes)
router.post('/addnote', fetchUserInfo,
    body('title').isLength({ min: 3 }),
    body('content').isLength({ min: 3 }),
    addNote)
router.put('/updatenote/:id', fetchUserInfo,
    body('title').isLength({ min: 3 }),
    body('content').isLength({ min: 3 }),
    updateNote)
router.delete('/deletenote/:id', fetchUserInfo, deleteNote)
export default router;