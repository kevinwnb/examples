const express = require("express")
const authenticate = require("./auth")
const productRouter = require("./routes/product")
const userRouter = require("./routes/user")
const app = express()
const jwt = require("jsonwebtoken")

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

app.use("/", express.static("./public"))
app.use("/products", express.static("./public"))
app.use("/downloads", express.static("./public"))
app.use("/login", express.static("./public"))
app.use("/register", express.static("./public"))

app.use(unless([{ path: "/api/product", method: "POST" }, { path: "/api/user", method: "POST" }], express.json()))
app.use(unless([{ path: "/api/user/login", method: "POST" }, { path: "/api/product", method: "GET" }, { path: "/api/user", method: "POST" }], authenticate))
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

app.listen(5500, () => {
    console.log("Server is running on port 5500...")
})