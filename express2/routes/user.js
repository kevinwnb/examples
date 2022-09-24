const express = require("express")
const router = express.Router()
const { addUser, updateUser, deleteUser, getUser, getUsers } = require("../controllers/user")

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", addUser)
router.put("/:id", updateUser)
router.delete("/", deleteUser)

module.exports = router