const jwt = require("jsonwebtoken")
const key = "abcd1234"
const util = require("util")

const authenticate = (req, res, next) => {
    if (!req.get("Authorization"))
        return res.status(401).send("Token not provided")
    let token = jwt.verify(req.get("Authorization").substring(7), key)
    if (token)
        return next()
    else {
        console.log(token)
        return res.status(404).send("Authentication error")
    }
}

module.exports = authenticate