const express = require("express");
const { UserModel } = require("../schema/user.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/contacts", async (req, res) => {
    const { username, email, phone, label } = req.body;
    try {
        const user = new UserModel({ name: username, email, phone, label });
        const new_user = await user.save();
        res.status(200).send({ "msg": "the user is registered successfully", "newUser": new_user });
    }
    catch (err) {
        res.status(500).send({ "Error": err.message });
    }
});

module.exports = { userRouter };