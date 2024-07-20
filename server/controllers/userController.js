const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists", status: false });
        }

        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(409).json({ message: "Email already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete newUser.password;

        res.status(201).json({ message: "User registered successfully.", status: true, newUser });

    } catch (error) {
        return next(error);
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials", status: false });
        }

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            message: "Login successful",
            status: true,
            user: userObj,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

async function setAvatar(req, res, next) {
    try {
        const { id: userId } = req.params;
        const { Image: avatar } = req.body;

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarSet: true,
                avatar
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarSet,
            avatar: userData.avatar,
            status: true
        });

    } catch (error) {
        return next(error);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const { id: userId } = req.params;
        const users = await User.find({ _id: { $ne: userId } }).select([
            "email",
            "username",
            "avatar",
            "_id",
        ]);
        return res.status(200).json({ message: "Users retrieved successfully", status: true, users });
    } catch (error) {
        return next(error);
    }
}
module.exports = { register, login, setAvatar, getAllUsers };