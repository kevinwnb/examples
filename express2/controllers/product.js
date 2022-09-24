const util = require("util")
const { v4: uuidv4 } = require("uuid")
let products = require("../products")

const getProducts = (req, res) => {
    console.log(util.inspect(products))
    return res.status(200).json(products)
}

const getProduct = (req, res) => {
    let product = products.find(p => p.id == req.params.id)
    console.log(util.inspect(product))
    return res.status(200).json(product)
}

const insertProduct = (req, res) => {
    products = [...products, { id: uuidv4(), name: req.body.name }]
    console.log(products)
    return res.status(200).send("Insert successful")
}

const updateProduct = (req, res) => {
    products.map(p => {
        if (p.id == req.params.id) {
            p.name = req.body.name;
            return p;
        }
    })
    console.log(products)
    return res.status(200).send("Update successful")
}

const deleteProduct = (req, res) => {
    products.filter(p => p.id != req.body.id)
    console.log(util.inspect(products))
    return res.status(200).json(products)
}

module.exports = { getProducts, getProduct, insertProduct, updateProduct, deleteProduct }