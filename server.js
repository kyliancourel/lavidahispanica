const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const https = require('https'); // Pour effectuer des requêtes https vers Google Drive
const http = require('http');  // Utilisé pour http également

const app = express();
const port = 3000;

// Middleware pour autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Middleware pour analyser les données JSON envoyées avec la requête
app.use(bodyParser.json());

// Définir le chemin du fichier JSON où les avis sont stockés
const commentsFilePath = path.join(__dirname, 'comment.json');

// Fonction pour lire les avis depuis le fichier
const readAvisFromFile = () => {
    if (fs.existsSync(commentsFilePath)) {
        const data = fs.readFileSync(commentsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];  // Si le fichier n'existe pas, retourner un tableau vide
};

// Fonction pour sauvegarder les avis dans le fichier
const saveAvisToFile = (avis) => {
    fs.writeFileSync(commentsFilePath, JSON.stringify(avis, null, 2), 'utf-8');
};

// Endpoint pour récupérer les avis (GET)
app.get('/avis', (req, res) => {
    const avis = readAvisFromFile();
    res.json(avis);
});

// Endpoint pour ajouter un avis (POST)
app.post('/avis', (req, res) => {
    const { prenom, nom, message, rating } = req.body;

    if (!prenom || !message || !rating) {
        return res.status(400).json({ error: "Les champs 'Prénom', 'Message' et 'Note' sont obligatoires." });
    }

    const avis = readAvisFromFile();

    const newAvis = {
        id: Date.now().toString(),  // Utilisation de l'ID unique basé sur le timestamp
        prenom, nom, message, rating, date: new Date().toISOString()
    };

    avis.push(newAvis);
    saveAvisToFile(avis);

    res.status(201).json(newAvis);
});

// Endpoint pour supprimer un avis spécifique (DELETE)
app.delete('/avis/:id', (req, res) => {
    const { id } = req.params;
    const avis = readAvisFromFile();

    const avisIndex = avis.findIndex(a => a.id === id);

    if (avisIndex !== -1) {
        avis.splice(avisIndex, 1);  // Supprimer l'avis
        saveAvisToFile(avis);
        res.status(200).json({ message: 'Avis supprimé avec succès' });
    } else {
        res.status(404).json({ error: 'Avis non trouvé' });
    }
});

// Endpoint pour supprimer tous les avis (DELETE)
app.delete('/avis', (req, res) => {
    // Réinitialiser les avis dans le fichier
    saveAvisToFile([]);
    res.status(200).json({ message: 'Tous les avis ont été supprimés avec succès.' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
