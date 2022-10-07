const express = require("express")
const authenticate = require("./auth")
const productRouter = require("./routes/product")
const userRouter = require("./routes/user")
const app = express()
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
mongoose.connect(process.env.CONN)
const path = require("path")
const fs = require("fs")

const unless = (paths, middleware) => {
    return function (req, res, next) {
        if (paths.find(p => (p.path == req.path && p.method == req.method))) {
            return next()
        }
        else {
            return middleware(req, res, next)
        }
    }
}

app.use(express.static("./client/build"))
app.use("/uploads", express.static("./uploads"))

app.use(unless([{ path: "/api/product", method: "POST" }, { path: "/api/user", method: "POST" }], express.json()))
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + " ...")
})