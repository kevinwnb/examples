const express = require("express")
const router = express.Router()
const {getProduct, getProducts, insertProduct, updateProduct, deleteProduct} = require("../controllers/product")

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", insertProduct)
router.put("/:id", updateProduct)
router.delete("/", deleteProduct)

module.exports = router