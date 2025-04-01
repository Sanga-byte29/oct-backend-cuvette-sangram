const mongoose = require('mongoose');
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    const { name, email, password, mobile } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
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
        res.status(500).json({
            message: err.message,
        });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
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
        res.status(500).json({
            message: err.message,
        });
    }
})

module.exports = router;