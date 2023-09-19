import mongoose from "mongoose";
import User from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwt_secret_key = 'jsonsecretkeyisasecretkey';

async function getHashedPassword(plainPassword) {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        return hashedPassword;
    } catch (error) {
        console.log("Hashing error ", error.message);
    }
}

export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    req.body.password = await getHashedPassword(req.body.password);
    const new_user_details = req.body;
    const newUser = new User(new_user_details);

    try {
        await newUser.save();
        // res.status(201).json(newUser);
        const data = {
            newUser:{
                id: newUser.id
            }
        }
        const token = jwt.sign(data, jwt_secret_key);
        res.status(201).json({token});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}