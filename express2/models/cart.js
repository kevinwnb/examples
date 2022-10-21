const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = new Schema({ user_id: Schema.Types.ObjectId, items: [] })

module.exports = mongoose.model("Cart", CartSchema)