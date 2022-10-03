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

const unless = (paths, middleware) => {
    return function (req, res, next) {
        if (paths.find(p => (p.path == req.path && p.method == req.method))) {
            return next()
        }
        else {
            console.log("bad")
            return middleware(req, res, next)
        }
    }
}

// app.use("/", express.static("./client/build"))
// app.use("/products", express.static("./client/build"))
// app.use("/downloads", express.static("./client/build"))
// app.use("/login", express.static("./client/build"))
// app.use("/register", express.static("./client/build"))

app.use(unless([{ path: "/api/product", method: "POST" }, { path: "/api/user", method: "POST" }], express.json()))
app.use(unless([{ path: "/api/user/login", method: "POST" }, { path: "/api/product", method: "GET" }, { path: "/api/user", method: "POST" }], authenticate))
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

app.listen(5500, () => {
    console.log("Server is running on port 5500...")
})