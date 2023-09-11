import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {res.send("At Auth");});

export default router;
