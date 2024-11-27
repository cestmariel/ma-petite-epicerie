const express = require('express');
const Produit = require('../models/Produit');
const router = express.Router();

// Aller chercher tous les produits
router.get('/', async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;