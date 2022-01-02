import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
    const {
        email, password, name, img
    } = req.body;

    console.log(req.body)
    try {
        const oldUser = await User.findOne({email});
        console.log(oldUser)

        if (oldUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name, img});

        const token = jwt.sign({email: result.email, id: result._id}, process.env.TOKEN, {expiresIn: 3600});

        res.status(201).json({result, token});
        console.log("user created")
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});

        console.log(error.message);
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const oldUser = await User.findOne({email});

        if (!oldUser) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        console.log(isPasswordCorrect)

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, process.env.TOKEN, {expiresIn: "4h"});

        res.status(200).json({result: oldUser, token});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, numTel, img, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {name, numTel, img, email, password: hashedPassword, _id: id}
    console.log(updatedUser)
    console.log('updated')
    try {
        await User.findByIdAndUpdate(id, updatedUser, {new: true});

        res.json(updatedUser);
    } catch (e) {
        console.log(e.message)
        console.log('updating error')
    }
}
export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (e) {
        console.log(e.message)
        console.log('fetching users fail')
    }
}
