require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Importer mysql2

// Configuration de l'application
const app = express();
const port = process.env.PORT || 3000; // Utilise le port défini dans les variables d'environnement ou 3000 par défaut

// Middleware
app.use(cors()); // Permet les requêtes cross-origin
app.use(bodyParser.json()); // Permet de parser le JSON dans les requêtes entrantes

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Adresse de la base de données
  user: process.env.DB_USER,      // Nom d'utilisateur
  password: process.env.DB_PASS,  // Mot de passe
  database: process.env.DB_NAME,  // Nom de la base de données
});

// Vérification de la connexion
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

// Exemple de schéma (table avis)
const createAvisTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS avis (
      id INT AUTO_INCREMENT PRIMARY KEY,
      prenom VARCHAR(255) NOT NULL,
      nom VARCHAR(255),
      message TEXT NOT NULL,
      rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      userId INT NOT NULL
    )
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Table "avis" créée ou déjà existante.');
  });
};

// Appeler la fonction pour créer la table (si elle n'existe pas)
createAvisTable();

// Routes API

// Endpoint pour récupérer tous les avis
app.get('/avis', (req, res) => {
  db.query('SELECT * FROM avis', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des avis.' });
    } else {
      res.json(results); // Retourne les résultats sous forme de JSON
    }
  });
});

// Endpoint pour ajouter un avis
app.post('/avis', (req, res) => {
  const { prenom, nom, message, rating, userId } = req.body;

  // Vérification des champs requis
  if (!prenom || !message || !rating || !userId) {
    return res.status(400).json({ error: "Les champs 'Prénom', 'Message', 'Note' et 'userId' sont obligatoires." });
  }

  const insertQuery = 'INSERT INTO avis (prenom, nom, message, rating, userId) VALUES (?, ?, ?, ?, ?)';
  db.query(insertQuery, [prenom, nom, message, rating, userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de l’ajout de l’avis.' });
    } else {
      res.status(201).json({ id: results.insertId, prenom, nom, message, rating, userId }); // Retourne l'avis ajouté
    }
  });
});

// Endpoint pour supprimer un avis (uniquement par le créateur du site)
app.delete('/avis/:id', (req, res) => {
  const avisId = req.params.id;
  const userId = req.body.userId;  // L'ID de l'utilisateur qui fait la demande (ce sera celui de l'administrateur ou créateur)

  // Vérifie si l'utilisateur est le créateur du site (par exemple, userId = 1)
  if (userId !== 1) {
    return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer cet avis." });
  }

  const deleteQuery = 'DELETE FROM avis WHERE id = ?';
  db.query(deleteQuery, [avisId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la suppression de l’avis.' });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Avis supprimé avec succès.' });
      } else {
        res.status(404).json({ error: 'Avis non trouvé.' });
      }
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
