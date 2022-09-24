const express = require("express")
const authenticate = require("./auth")
const productRouter = require("./routes/product")
const userRouter = require("./routes/user")
const app = express()

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: false }))
app.use(authenticate)
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

app.listen(5500, () => {
    console.log("Server is running on port 5500...")
})