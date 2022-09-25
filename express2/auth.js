const authenticate = (req, res, next) => {
    if (req.url == "/api/product" && req.method == "POST")
        return next()
    else if (req.body.user === "Kevin")
        return next()

    return res.status(404).send("Authentication error")
}

module.exports = authenticate