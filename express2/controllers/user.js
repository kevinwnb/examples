let users = require("../users")
const { v4: uuidv4 } = require("uuid")
const User = require("../models/user")
const formidable = require("formidable")
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")
const util = require("util")
const hash = require("object-hash")

const getUsers = (req, res) => {
    return res.status(200).json(users)
}

const getUser = (req, res) => {
    return res.status(200).json({ msg: "Eureka!" })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email, password: hash({ password: req.body.password }) }, (err, user) => {
        if (!user)
            return res.status(404).send("No user was found")
        let token = jwt.sign({ user: user._id, token: uuidv4() }, process.env.SECRET, { expiresIn: 60 })
        User.updateOne({ email: req.body.email, password: hash({ password: req.body.password }) }, { token: token }, (err, result) => {
            if (result.acknowledged)
                return res.status(200).json({ token: token })
        })
    })
}

const addUser = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.profile_image.filepath;
        var basePath = "./client/build/"
        var newpath = basePath + "assets/images/" + uuidv4() + path.extname(files.profile_image.originalFilename);
        fs.rename(oldpath, newpath, function (err) {
            if (err)
                throw err
            let model = new User()
            model.first_name = fields.first_name
            model.last_name = fields.last_name
            model.email = fields.email
            model.password = hash({ password: fields.password })
            model.img_path = newpath.substring(basePath.length)
            model.token = ""
            model.save((err, result) => {
                if (err)
                    throw err
                console.log(util.inspect(result))
                return res.status(200).send("User created")
            })
        });
    });
}

const updateUser = (req, res) => {
    users = users.map(u => {
        if (u.id == req.params.id) {
            u.first_name = req.body.first_name
            u.last_name = req.body.last_name
            u.email = req.body.email
        }

        return res.status(200).json(users)
    })
}

const deleteUser = (req, res) => {
    users = users.filter(u => u.id != req.body.id)
    return res.status(200).json(users)
}

module.exports = { login, addUser, updateUser, getUser, getUsers, deleteUser }