const express = require("express")
const authenticate = require("./auth")
const productRouter = require("./routes/product")
const userRouter = require("./routes/user")
const app = express()

const unless = (paths, middleware, method = null) => {
    return function (req, res, next) {
        if (paths.includes(req.path)) {
            if (method != null) {
                if (req.method == method)
                    return next()
                else
                    return middleware(req, res, next)
            }
            else {
                return next()
            }
        }
        else
            return middleware(req, res, next)
    }
}

app.use("/", express.static("./public"))
app.use("/products", express.static("./public"))
app.use("/downloads", express.static("./public"))

app.use(unless("/api/product", express.json(), "POST"))
app.use(unless("/api/product", authenticate, "GET"))
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

app.listen(5500, () => {
    console.log("Server is running on port 5500...")
})