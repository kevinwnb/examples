const { v4: uuidv4 } = require("uuid")
const User = require("../models/user")
const formidable = require("formidable")
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")
const util = require("util")
const hash = require("object-hash")
const { nextTick } = require("process")

const getUsers = (req, res) => {
    return res.status(200).json(users)
}

const getUser = (req, res) => {
    return res.status(200).json({ msg: "Eureka!" })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email, password: hash({ password: req.body.password }) }, (err, user) => {
        if (err) throw new Error(err.message)
        if (!user)
            return res.status(404).send("No user was found")
        let token = jwt.sign({ user_id: user._id, user: user._id, token: uuidv4() }, process.env.SECRET, { expiresIn: 600 })
        User.updateOne({ email: req.body.email, password: hash({ password: req.body.password }) }, { token: token }, (err, result) => {
            if (result.acknowledged)
                return res.status(200).json({ token: token })
        })
    })
}

const addUser = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw new Error(err.message)
        var oldpath = files.profile_image.filepath;
        var newpath = "./uploads/" + uuidv4() + path.extname(files.profile_image.originalFilename);
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) throw new Error(err.message)
            let model = new User()
            model.first_name = fields.first_name
            model.last_name = fields.last_name
            model.email = fields.email
            model.password = hash({ password: fields.password })
            model.img_path = newpath.substring(1)
            model.token = ""
            model.save((err, result) => {
                if (err)
                    throw new Error(err.message)
                if (!result.ok)
                    return res.send("User not created")
                return res.status(200).send("User created")
            })
        });
    });
}

const updateUser = (req, res) => {
    //
}

const deleteUser = (req, res) => {
    //
}

module.exports = { login, addUser, updateUser, getUser, getUsers, deleteUser }