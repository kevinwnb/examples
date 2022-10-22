const Cart = require("../models/cart")

const insertItem = (req, res) => {
    try {
        console.log(req.body.item)
        Cart.findOneAndUpdate({ user_id: res.locals.token.user_id }, { "$push": { items: req.body.item } }, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });

            return res.send('Succesfully saved.');
        });
    } catch (e) {
        console.log(e.type + " | " + e.message)
    }
}

const getItems = (req, res) => {
    Cart.findOne({ user_id: res.locals.token.user_id }, function (err, cart) {
        if (err) return res.send("Failed")
        
        return res.json(cart)
    });
}

module.exports = { insertItem, getItems }