const express = require("express")
const router = express.Router()
const { addUser, updateUser, deleteUser, getUser, getUsers } = require("../controllers/user")

router.get("/", express.urlencoded({ extended: false }), getUsers)
router.get("/:id", express.urlencoded({ extended: false }), getUser)
router.post("/", express.urlencoded({ extended: false }), addUser)
router.put("/:id", express.urlencoded({ extended: false }), updateUser)
router.delete("/", express.urlencoded({ extended: false }), deleteUser)

module.exports = router