// const sayHi = require("./module1")
// const numbers = require("./module2")
// const { readFileSync, writeFileSync, writeFile, readFile } = require("fs")
// const http = require('http')
// const util = require("util")

// sayHi("Kevin", numbers.number1)

// const functionA = () => {
//     const n = 2
//     setTimeout(() => { console.log(n) }, 1500)
// }

// const functionB = () => {
//     console.log(1)
//     functionA()
//     console.log(3)
// }

// functionB()

// writeFile("./writed-file.txt", "Helloa", { flag: "a" }, (err, result) => {
//     if (err) {
//         console.log(err)
//         return;
//     }

//     console.log("Done!")
// })

// readFile("./writed-file.txt", "utf8", (err, result) => {
//     if (err) {
//         console.log(err)
//         return;
//     }

//     console.log(result)
// })

// const server = http.createServer((req, res) => {
//     if (req)
//         writeFile("req.txt", util.inspect(req), { encoding: "utf8", flag: "a" }, () => {
//             console.log("Done!")
//         })
// })

// server.listen(5000)

const express = require("express")

const app = express()


app.get("/api/one", (req, res) => {
    console.log(req.socket.remoteAddress)
    res.status(200).send(req.socket.remoteAddress)
})

app.use(express.static("./public"))

app.all("*", (req, res) => {
    res.status(404).send("Resource not found")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})