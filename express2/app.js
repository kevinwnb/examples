const express = require("express")
const authenticate = require("./auth")
const productRouter = require("./routes/product")
const app = express()

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: false }))
app.use(authenticate)
app.use("/api/products", productRouter)

app.listen(5500, () => {
    console.log("Server is running on port 5500...")
})