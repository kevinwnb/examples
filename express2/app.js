const express = require("express")
const authenticate = require("./auth")
const productRouter = require("./routes/product")
const userRouter = require("./routes/user")
const cartRouter = require("./routes/cart")
const app = express()
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
mongoose.connect(process.env.CONN)
const path = require("path")
const fs = require("fs")

app.use(express.static("./client/build"))
app.use("/uploads", express.static("./uploads"))

app.use(express.json())
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + " ...")
})