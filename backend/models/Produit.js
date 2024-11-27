const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    image: { type: String, required: true },
    categorie: { 
        id: { type: Number, required: true},
        nom: { type: String, required: true}
    }
});

module.exports = mongoose.model('Produit', produitSchema);