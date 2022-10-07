const express = require("express")
const router = express.Router()
const {getProduct, getProducts, insertProduct, updateProduct, deleteProduct} = require("../controllers/product")
const authenticate = require("../auth")

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", authenticate, insertProduct)
router.put("/:id", authenticate, updateProduct)
router.delete("/", authenticate, deleteProduct)

module.exports = router