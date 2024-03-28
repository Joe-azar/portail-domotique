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
  
  bcrypt.hash(motDePasse, saltRounds, (err, hash) => {
    if (err) {
      console.error('Erreur lors du hashage du mot de passe', err);
      return res.status(500).send('Erreur serveur'); // Make sure to return here
    }

    connection.query('INSERT INTO user (email, name, last_name, password) VALUES (?, ?, ?, ?)', [email, prenom, nom, hash], (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'inscription', error);
        return res.status(500).send('Erreur lors de l\'inscription'); // Return to stop execution
      }

      // Use res.json to automatically set the content-type to application/json
      return res.json({ message: 'Inscription réussie' }); // Return to ensure function exits
    });
  });
});


// Endpoint de connexion
app.post('/api/connexion', (req, res) => {
  console.log(req.body);
  const { email, motDePasse } = req.body;

  // Vérifiez si l'email existe dans la base de données
  connection.query('SELECT * FROM user WHERE email = ?', [email], (error, users) => {
    if (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur', error);
      return res.status(500).send('Erreur lors de la recherche de l\'utilisateur');
    }

    if (users.length === 0) {
      // Aucun utilisateur trouvé avec cet email
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Utilisateur trouvé, comparons maintenant le mot de passe
    const user = users[0];
    console.log("Mot de passe fourni:", motDePasse);
    console.log("Hash du mot de passe dans la base:", user.password);
    bcrypt.compare(motDePasse, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la vérification du mot de passe', err);
        return res.status(500).send('Erreur serveur');
      }
    
      console.log("Le mot de passe correspond:", isMatch);
    
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      
      // Authentification réussie
      return res.json({ success: true, message: 'Connexion réussie', userid: user.id });

    });
  });
});

// Endpoint d'afficher plate
app.get('/api/licensePlates/:userid', (req, res) => {
  const { userid } = req.params;
  console.log(userid);
  connection.query('SELECT * FROM plate  WHERE userid = ?', [userid], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des plaques', error);
      return res.status(500).send('Erreur serveur');
    }

     res.json({ licensePlates: results });
  });
});
// Génération et envoi du token lors de la connexion
// app.post('/api/login', (req, res) => {
//   // Vérifiez les identifiants de l'utilisateur ici...
//   const userId = /* récupérer l'userId de l'utilisateur */;
//   const token = jwt.sign({ userId }, 'votreSecretJWT', { expiresIn: '24h' });
//   res.json({ token });
// });






app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});