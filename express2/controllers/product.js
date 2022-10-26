const util = require("util")
const { v4: uuidv4 } = require("uuid")
const formidable = require("formidable")
const fs = require("fs")
const path = require("path")
const Product = require("../models/product")

const getProducts = (req, res) => {
    Product.find({}, (err, docs) => {
        if (err) throw new Error(err.message)
        return res.status(200).json(docs)
    })
}

const getProduct = (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (err) throw new Error(err.message)
        return res.status(200).json(doc)
    })
}

const insertProduct = (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        if (err)
            return res.send(err.message)

        var oldpath = files.product_image.filepath
        var newpath = "./uploads/" + uuidv4() + path.extname(files.product_image.originalFilename);
        fs.copyFile(oldpath, newpath, function (err) {
            if (err)
                return res.send(err.message)

            let model = new Product()
            model.name = fields.name
            model.img_path = newpath.substring(1)
            model.save((err, result) => {
                if (err)
                    return res.send(err.message)

                return res.status(200).json({ msg: "Insert successful" })
            })
        });
    });
}

const updateProduct = (req, res) => {
    Product.updateOne({ _id: req.params.id }, { name: req.body.name, img_path: req.body.img_path }, (err, result) => {
        if (err)
            throw err

        Product.findById(req.params.id, (err, doc) => {
            if (err)
                throw err
            return res.status(200).json(doc)
        })
    })
}

const deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.body.id }, (err, result) => {
        if (err) throw new Error(err.message)
        if (!result.ok)
            return res.send("Product deletion failed")

        return res.status(200).send("Product deleted!")
    })
}

module.exports = { getProducts, getProduct, insertProduct, updateProduct, deleteProduct }