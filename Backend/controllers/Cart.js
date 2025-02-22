const Cart = require('../models/Cart')

exports.addCartItem = async (req, res) => {
    try {
        const added = await new Cart({
            user: req.user,
            product: req.body.item,
        });

        await added.save()
        res.status(201).json(added)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error adding product to cart, please trying again later' })
    }
}

exports.getCartItems = async (req, res) => {
    try {
        const result = await Cart.find({ user: req.user });

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching cart items, please trying again later' })
    }
}

exports.updateCartItem = async (req, res) => {
    try {
        const updated = await Cart.findByIdAndUpdate(req.body.item, { quantity: req.body.quantity }, { new: true });

        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error updating cart items, please trying again later' })
    }
}

exports.removeCartItem = async (req, res) => {
    try {
        const removed = await Cart.findByIdAndDelete(req.body.item)

        res.status(200).json(removed)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error removing cart item, please trying again later' })
    }
}

exports.emptyCart = async (req, res) => {
    try {
        await Cart.deleteMany({ user: req.user })

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Some Error occured while emptying your cart" })
    }

}