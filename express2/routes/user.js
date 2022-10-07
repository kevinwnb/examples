const express = require("express")
const router = express.Router()
const { login, addUser, updateUser, deleteUser, getUser, getUsers } = require("../controllers/user")
const authenticate = require("../auth")

router.get("/", getUsers)
router.post("/login", login)
router.get("/:id", getUser)
router.post("/", addUser)
router.put("/:id", authenticate, updateUser)
router.delete("/", authenticate, deleteUser)

module.exports = router