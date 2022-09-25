const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({id: mongoose.Types.ObjectId, name: String, img_path:String})

module.exports = mongoose.model("Product", ProductSchema, "products")