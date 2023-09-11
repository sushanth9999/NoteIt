import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hi! It is working');
})

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes)


//connecting database
const mongo_URL = "mongodb+srv://sushanthjanumpally:sushanth@cluster0.z1bqlhz.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(mongo_URL)
.then(() => app.listen(PORT, () => console.log("Server running on port " + PORT)))
.catch((error) => console.log(error.message));
