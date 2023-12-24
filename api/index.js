const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User.js');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const jwtSecret = process.env.JWT_SECRET;

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL, // Update with your client's actual origin
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); // Added to parse JSON in request bodies

app.get("/test", (req, res) => {
    res.json("test success");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.create({ username, password });
        jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json('Internal Server Error');
            }
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).status(201).json('Success');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
