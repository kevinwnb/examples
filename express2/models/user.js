const mongoose = require("mongoose")
const UserSchema = mongoose.Schema

const userSchema = new UserSchema({ first_name: String, last_name: String, email: String, password: String, img_path: String, token: String })

module.exports = mongoose.model("User", userSchema, "users")