import express from 'express';
import { createUser, loginUser, getUserInfo } from '../api-controllers/users.js';
import { body } from 'express-validator';
import { fetchUserInfo } from '../middleware/fetchUserInfo.js';
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

router.get('/getuser', fetchUserInfo ,getUserInfo);

export default router;
