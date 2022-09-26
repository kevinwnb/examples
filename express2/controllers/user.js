let users = require("../users")
const { v4: uuidv4 } = require("uuid")
const User = require("../models/user")
const formidable = require("formidable")
const jwt = require("jsonwebtoken")
const key = "abcd1234"
const path = require("path")
const fs = require("fs")
const util = require("util")

const getUsers = (req, res) => {
    return res.status(200).json(users)
}

const getUser = (req, res) => {
    return res.status(200).json(users.find(u => u.id == req.params.id))
}

const login = (req, res) => {
    User.findOne({ email: req.body.email, password: jwt.sign(req.body.password, key) }, (err, user) => {
        let token = jwt.sign(uuidv4(), key)
        User.updateOne({ email: req.body.email, password: jwt.sign(req.body.password, key) }, { token: token }, (err, result) => {
            if (result.acknowledged)
                return res.status(200).json({ token: token })
        })
    })
}

const addUser = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.profile_image.filepath;
        var newpath = "./public/images/" + uuidv4() + path.extname(files.profile_image.originalFilename);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err
            let model = new User()
            model.first_name = fields.first_name
            model.last_name = fields.last_name
            model.email = fields.email
            model.password = jwt.sign(fields.password, key)
            model.img_path = newpath.substring(9)
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