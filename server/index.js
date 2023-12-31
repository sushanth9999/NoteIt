import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    res.send('Hi! It is working');
})

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes)


//connecting database
const mongo_URL = "mongodb";
const PORT = process.env.PORT || 5000;

mongoose.connect(mongo_URL)
.then(() => app.listen(PORT, () => console.log("Server running on port " + PORT)))
.catch((error) => console.log(error.message));
