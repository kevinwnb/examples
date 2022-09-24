let users = require("../users")
const { v4: uuidv4 } = require("uuid")

const getUsers = (req, res) => {
    return res.status(200).json(users)
}

const getUser = (req, res) => {
    return res.status(200).json(users.find(u => u.id == req.params.id))
}

const addUser = (req, res) => {
    users = [...users, { id: uuidv4(), first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, role: "customer" }]
    return res.status(200).json(users)
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

module.exports = { addUser, updateUser, getUser, getUsers, deleteUser }