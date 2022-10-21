const router = require("express").Router()
const { insertItem, getItems } = require("../controllers/cart")
const authenticate = require("../auth")

router.post("/", authenticate, insertItem)
router.get("/", authenticate, getItems)

module.exports = router