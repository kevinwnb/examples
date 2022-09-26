const authenticate = (req, res, next) => {
    if (req.body.user === "Kevin")
        return next()
    else
        return res.status(404).send("Authentication error")
}

module.exports = authenticate