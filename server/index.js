import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    res.send('Hi! It is working');
})

//connecting database
const mongo_URL = "mongodb+srv://sushanthjanumpally:sushanth@cluster0.z1bqlhz.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(mongo_URL)
.then(() => app.listen(PORT, () => console.log("Server running on port " + PORT)))
.catch((error) => console.log(error.message));
