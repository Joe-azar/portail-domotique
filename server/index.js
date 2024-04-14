require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// Set MIME type for HLS streams
app.use((req, res, next) => {
  if (req.path.endsWith('.m3u8')) {
    res.type('application/x-mpegURL');
  } else if (req.path.endsWith('.ts')) {
    res.type('video/MP2T');
  }
  next();
});

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
  connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'email', err);
      return res.status(500).send('Erreur serveur');
    }

    if (results.length > 0) {
      // Un utilisateur avec cet email existe déjà
      return res.status(409).send('Ce compte existe déjà');
    }
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
      const userId = results.insertId; // Obtenez l'ID de l'utilisateur inséré
        connection.query('INSERT INTO gatestate (userid, state) VALUES (?, ?)', [userId, 0], (errorGateState) => {
          if (errorGateState) {
            console.error('Erreur lors de l\'ajout dans gatestate', errorGateState);
          }

      // Use res.json to automatically set the content-type to application/json
      return res.json({ message: 'Inscription réussie' }); // Return to ensure function exits
    });
  });
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

// Endpoint pour ajouter une plaque d'immatriculation
app.post('/api/addLicensePlate', (req, res) => {
  const { userid, licensePlate } = req.body;

  if (!userid || !licensePlate) {
    return res.status(400).send('Les données userid et licensePlate sont requises.');
  }

  // Vérifiez d'abord si la plaque existe déjà pour cet utilisateur
  const checkQuery = 'SELECT * FROM plate WHERE userid = ? AND number = ?';

  connection.query(checkQuery, [userid, licensePlate], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification de la plaque:', error);
      return res.status(500).send('Erreur serveur lors de la vérification.');
    }

    if (results.length > 0) {
      // La plaque existe déjà, donc on envoie un message d'erreur
      return res.status(409).send('Cette plaque existe déjà.');
    } else {
      // La plaque n'existe pas, on peut procéder à l'ajout
      const insertQuery = 'INSERT INTO plate (userid, number) VALUES (?, ?)';
      
      connection.query(insertQuery, [userid, licensePlate], (insertError) => {
        if (insertError) {
          console.error('Erreur lors de l\'ajout de la plaque:', insertError);
          return res.status(500).send('Erreur serveur lors de l\'ajout de la plaque.');
        }

        return res.json({ message: 'Plaque d\'immatriculation ajoutée avec succès.' });
      });
    }
  });
});

// Endpoint pour supprimer une plaque d'immatriculation
app.delete('/api/deleteLicensePlate/:plateId', (req, res) => {
  const { plateId } = req.params;

  // Assurez-vous que plateId est fourni
  if (!plateId) {
    return res.status(400).send('L\'ID de la plaque est requis.');
  }

  const query = 'DELETE FROM plate WHERE id = ?';

  connection.query(query, [plateId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression de la plaque d\'immatriculation:', error);
      return res.status(500).send('Erreur lors de la suppression de la plaque d\'immatriculation');
    }

    if (results.affectedRows === 0) {
      // Aucune ligne affectée signifie que la plaque n'a pas été trouvée
      return res.status(404).send('Plaque d\'immatriculation non trouvée.');
    }

    return res.json({ message: 'Plaque d\'immatriculation supprimée avec succès' });
  });
});

app.get('/api/user/:userid', (req, res) => {
  const { userid } = req.params;

  const query = 'SELECT email, name, last_name FROM user WHERE id = ?';

  connection.query(query, [userid], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return res.status(500).send('Erreur interne du serveur');
    }

    if (results.length > 0) {
      const user = results[0];
      return res.json({ email: user.email, prenom: user.name, nom: user.last_name });
    } else {
      return res.status(404).send('Utilisateur non trouvé');
    }
  });
});
// Endpoint to get camera stream URL
app.get('/api/cameraStreamUrl', (req, res) => {
  const streamUrl = `http://172.20.10.3:8080/stream`;
  res.json({ url: streamUrl });
});

app.post('/api/uploadImage', (req, res) => {
  const { userid, image } = req.body;
  const query = 'INSERT INTO user_images (userid, image) VALUES (?, ?)';

  connection.query(query, [userid, image], (error) => {
    if (error) {
      console.error('Error uploading image:', error);
      return res.status(500).send('Error uploading image');
    }
    res.json({ message: 'Image uploaded successfully' });
  });
});

//////////////////////////////////////////////////
app.post('/api/changeState', (req, res) => {
  const { userid } = req.body;

  if (userid == null ) {
    return res.status(400).json({ error: 'Les paramètres "userid" et "state" sont requis.' });
  }

  // La requête SQL pour mettre à jour l'état
  const sql = 'UPDATE gatestate SET state = 1 WHERE userid = ?';

  // Exécuter la requête SQL
  connection.query(sql, [userid], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la base de données', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json({ success: true, message: 'L\'état a été mis à jour avec succès.' });
  });
});
/////////////////////////////////////////////////


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});