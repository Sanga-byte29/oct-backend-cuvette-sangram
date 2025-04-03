const mongoose = require('mongoose');
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post('/register', async (req, res, next) => {
    const { name, email, password, mobile } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error("User already exists");
            error.name = "ValidationError";
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (err) {
        next(err);
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found");
            error.name = "NotFoundError";
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.name = "UnauthorizedError";
            throw error;
        }
        // jwt.io
        const token = jwt.sign({
            id: user._id,
        }, process.env.SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({
            message: "User logged in successfully",
            token,
        });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;