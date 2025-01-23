require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configuration de l'application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/avisDB?retryWrites=true&w=majority';
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Définition du schéma et du modèle pour les avis
const avisSchema = new mongoose.Schema({
    prenom: { type: String, required: true },
    nom: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
});

const Avis = mongoose.model('Avis', avisSchema);

// Middleware pour vérifier le jeton d'administration
const verifyAdmin = (req, res, next) => {
    const adminSecret = req.headers['admin-secret'];
    if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: 'Accès refusé. Vous n’êtes pas autorisé à effectuer cette action.' });
    }
    next();
};

// Routes API

// Endpoint pour récupérer tous les avis
app.get('/avis', async (req, res) => {
    try {
        const avis = await Avis.find();
        res.json(avis);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis.' });
    }
});

// Endpoint pour ajouter un avis
app.post('/avis', async (req, res) => {
    const { prenom, nom, message, rating } = req.body;

    if (!prenom || !message || !rating) {
        return res.status(400).json({ error: "Les champs 'Prénom', 'Message' et 'Note' sont obligatoires." });
    }

    try {
        const newAvis = new Avis({ prenom, nom, message, rating });
        await newAvis.save();
        res.status(201).json(newAvis);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l’ajout de l’avis.' });
    }
});

// Endpoint pour supprimer un avis spécifique (réservé à l'administrateur)
app.delete('/avis/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Avis.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Avis supprimé avec succès.' });
        } else {
            res.status(404).json({ error: 'Avis non trouvé.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l’avis.' });
    }
});

// Endpoint pour supprimer tous les avis (réservé à l'administrateur)
app.delete('/avis', verifyAdmin, async (req, res) => {
    try {
        await Avis.deleteMany();
        res.status(200).json({ message: 'Tous les avis ont été supprimés avec succès.' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression des avis.' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
