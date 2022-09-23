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
const util = require("util")

const app = express()

const products = [
    {
        id: 1,
        name: "Camiseta manga corta",
        description: "Camiseta manga corta 100% algodón",
        reviews: [
            {
                id: 1,
                user_id: 1,
                review: "Camiseta de buena calidad"
            },
            {
                id: 2,
                user_id: 2,
                review: "Camiseta de media calidad"
            },
            {
                id: 3,
                user_id: 3,
                review: "Camiseta de mala calidad"
            }
        ]
    },
    {
        id: 2,
        name: "Camiseta manga larga",
        description: "Camiseta manga larga 100% algodón",
        reviews: [
            {
                id: 4,
                user_id: 1,
                review: "Camiseta de buena calidad"
            },
            {
                id: 5,
                user_id: 2,
                review: "Camiseta de media calidad"
            },
            {
                id: 6,
                user_id: 3,
                review: "Camiseta de mala calidad"
            }
        ]
    },
    {
        id: 3,
        name: "Chaqueta",
        description: "Chaqueta 100% algodón",
        reviews: [
            {
                id: 7,
                user_id: 1,
                review: "Camiseta de buena calidad"
            },
            {
                id: 8,
                user_id: 2,
                review: "Camiseta de media calidad"
            },
            {
                id: 9,
                user_id: 3,
                review: "Camiseta de mala calidad"
            }
        ]
    }
]

app.get("/api/products", (req, res) => {
    console.log(req.socket.remoteAddress)
    return res.status(200).json(products)
})

app.get("/api/products/reviews", (req, res) => {
    let reviews = []
    products.forEach(p => {
        p.reviews.forEach(r => {
            reviews = [...reviews, r]
        })
    })
    return res.status(200).json({ reviews: reviews })
})

app.get("/api/products/reviews/:id", (req, res) => {
    let reviews = []
    products.forEach(p => {
        p.reviews.forEach(r => {
            reviews = [...reviews, r]
        })
    })
    console.log(util.inspect(reviews))
    return res.status(200).json(reviews.find(r => r.id == req.params.id))
})

app.get("/api/products/:id", (req, res) => {
    let product = products.find(p => p.id == req.params.id)
    let { id, name, description } = product
    return res.status(200).json({ id, name, description })
})

app.get("/api/products/:id/reviews", (req, res) => {
    const product = products.find(p => p.id == req.params.id)
    return res.status(200).json(product.reviews)
})

app.use(express.static("./public"))

app.all("*", (req, res) => {
    return res.status(404).send("Resource not found")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})