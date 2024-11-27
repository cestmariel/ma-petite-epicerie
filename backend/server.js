const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ProduitRoutes = require('/routes/ProduitRoutes');

dotenv.config(); // on précise que l'on va utiliser un fichier .env pour les variables d'environnement auxquelles on pourra accéder par la suite avec process.env

const app = express();

// middlewares : ces méthodes vont s'appliquer à chaque requête (entre l'utilisateur et le server)
app.use(express.json());
app.use(cors());

// Se connecter avec la base de données
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('connecté à Mongodb Compass'))
    .catch((err) =>console.error('Erreur de connexion :', err))

// Routes
app.use('/api/produits', ProduitRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`le serveur fonctionne sur le port ${PORT}`)
})