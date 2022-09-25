const util = require("util")
const { v4: uuidv4 } = require("uuid")
let products = require("../products")
const formidable = require("formidable")
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const conn = mongoose.connect('mongodb+srv://kevinwnb:yflOIONVToQYHIw1@cluster0.e3ffr.mongodb.net/express2?retryWrites=true&w=majority')
const Product = require("../models/product")

const getProducts = (req, res) => {
    Product.find({}, (err, docs) => {
        console.log(util.inspect(docs))
        return res.status(200).json(docs)
    })
    console.log(util.inspect(products))
}

const getProduct = (req, res) => {
    let product = Product.findById(req.params.id, (err, doc) => {
        console.log(util.inspect(doc))
        return res.status(200).json(doc)
    })
}

const insertProduct = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(util.inspect(files))
        var oldpath = files.product_image.filepath;
        var newpath = "./public/images/" + uuidv4() + path.extname(files.product_image.originalFilename);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            let model = new Product()
            model.name = fields.name
            model.img_path = newpath.substring(9)
            model.save((err, result) => {
                if (err)
                    throw err
                console.log(util.inspect(result))
                return res.status(200).send("Insert successful")
            })
            //products = [...products, { id: uuidv4(), name: fields.name, img_path: newpath.substring(9) }]
            //console.log(products)
        });
    });
}

const updateProduct = (req, res) => {
    Product.updateOne({ _id: req.params.id }, { name: req.body.name, img_path: req.body.img_path }, (err, result) => {
        if (err)
            throw err

        let product = Product.findById(req.params.id, (err, doc) => {
            if (err)
                throw err
            return res.status(200).json(doc)
        })
    })
}

const deleteProduct = (req, res) => {
    products.filter(p => p.id != req.body.id)
    console.log(util.inspect(products))
    return res.status(200).json(products)
}

module.exports = { getProducts, getProduct, insertProduct, updateProduct, deleteProduct }