const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();


router.post('/', async (req, res) => {
    try { 
        const cart = await cartManager.crearCarrito();
        res.json(cart);
    }
    catch (error) { 
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    
    try{ 
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.product);
    }
    catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor"});
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;


    try {
    const result = await cartManager.addToCart(cartId, productId, quantity);
    res.json(result);
    }
    catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;