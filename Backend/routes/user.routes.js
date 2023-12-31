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
        res
            .status(200)
            .send({ msg: "the user is registered successfully", newUser: new_user });
    } catch (err) {
        res.status(500).send({ Error: err.message });
    }
});

userRouter.get("/", async (req, res) => {
    try {
        const contacts = await UserModel.find();
        res.status(200).send({ contacts: contacts });
    } catch (err) {
        res.status(500).send({ Error: err.message });
    }
});

userRouter.get("/search", async (req, res) => {
    const { name } = req.params;
    try {
        const result = await UserModel.find({ name });
        res.status(200).send({ employee: result });
    } catch (err) {
        res.status(500).send({ Error: err.message });
    }
});

userRouter.patch("/update", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        const updated_user = await UserModel.findByIdAndUpdate(
            { _id: user._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            msg: `user with id ${user._id} is updated successfully`,
            updated_user: updated_user,
        });
    } catch (err) {
        res.status(500).send({ Error: err.message });
    }
});

userRouter.delete("/delete", async (req, res) => {
    const { id } = req.query;
    try {
        // const user = await UserModel.findOne({ email: req.body.email });
        const deleted_user = await UserModel.findByIdAndDelete({ _id: id });
        res.status(200).send({
            msg: `user with id ${user._id} is deleted successfully`,
            deleted_user: deleted_user,
        });
    } catch (err) {
        res.status(500).send({ Error: err.message });
    }
});

module.exports = { userRouter };
