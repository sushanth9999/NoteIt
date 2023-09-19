import express from 'express';
import { createUser, loginUser } from '../api-controllers/users.js';
import { body } from 'express-validator';
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body);
    res.send("At Auth");
});

router.post('/createuser',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    createUser);

router.post('/loginuser',
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    loginUser);

export default router;
