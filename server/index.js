require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Créez une connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données avec l\'id ' + connection.threadId);
});

// Endpoint d'inscription
app.post('/api/inscription', (req, res) => {
  const { email, prenom, nom, motDePasse } = req.body;

  // Hashage du mot de passe
  bcrypt.hash(motDePasse, saltRounds, (err, hash) => {
    if (err) {
      console.error('Erreur lors du hashage du mot de passe', err);
      return res.status(500).send('Erreur serveur');
    }

    // Requête pour insérer l'utilisateur, en utilisant le mot de passe hashé
    connection.query('SELECT * FROM user', (error, results, fields) => {
      if (error) throw error;
      // Process your results here
      console.log(results);
    });
    
    connection.query('INSERT INTO user (email, name, last_name, password) VALUES (?, ?, ?, ?)', [email, prenom, nom, hash], (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'inscription', error);
        return res.status(500).send('Erreur lors de l\'inscription');
      }
      res.send('Inscription réussie');
    });
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});