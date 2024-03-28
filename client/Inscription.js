import React, {useState}from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Button, Alert } from 'react-native';

const Inscription = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmMotDePasse, setConfirmMotDePasse] = useState('');
  const inscrireUtilisateur = () => {
    // Vérification basique des champs
    if (!email || !prenom || !nom || !motDePasse || !confirmMotDePasse) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    // Vérification de la correspondance des mots de passe
    if (motDePasse !== confirmMotDePasse) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    // Si tout est bon, procédez à l'envoi des données
    console.log('Tout est bon pour l\'envoi des données:', { email, prenom, nom, motDePasse });
    const userData = { email, prenom, nom, motDePasse };
    fetch('http://172.20.10.3:3000/api/inscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (response.status === 409) {
        // Email existe déjà
        throw new Error('Ce compte existe déjà');
      }
      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.indexOf('application/json') !== -1) {
        return response.json(); // Parse only if response is OK and content type is JSON
      } else if (!response.ok) {
        throw new Error('Réponse du réseau non ok.');
      } else {
        throw new Error('La réponse n\'est pas en JSON.');
      }
    })
    
    .then(data => {
      Alert.alert('Succès', 'Inscription réussie',[
        {
          text: "OK",
          onPress: () => navigation.navigate('Page_acceuil')
        }
      ]);
      // Ici, vous pouvez gérer la navigation de l'utilisateur vers un nouvel écran, etc.
    })
    .catch((error) => {
      console.error('Erreur:', error.message);
      Alert.alert('Erreur', error.message.startsWith('SyntaxError') ? 'Problème de format de la réponse du serveur.' : 'Problème lors de l\'inscription');
    });
    
    

  };

  return (
    
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.navigate('Page_acceuil')}
      >
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Bienvenue sur GateKeeper</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#D7D7D7"
        onChangeText={setEmail} // Mise à jour de l'état email
        value={email} // Valeur contrôlée par l'état email
      />
      <TextInput
        style={styles.input}
        placeholder="Prenom"
        placeholderTextColor="#D7D7D7"
        onChangeText={setPrenom} // Mise à jour de l'état prenom
        value={prenom} // Valeur contrôlée par l'état prenom
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#D7D7D7"
        onChangeText={setNom} // Mise à jour de l'état nom
        value={nom} // Valeur contrôlée par l'état nom
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#D7D7D7"
        onChangeText={setMotDePasse} // Mise à jour de l'état motDePasse
        value={motDePasse} // Valeur contrôlée par l'état motDePasse
        secureTextEntry // Masquer le mot de passe
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer votre mot de passe"
        placeholderTextColor="#D7D7D7"
        onChangeText={setConfirmMotDePasse} // Mise à jour de l'état confirmMotDePasse
        value={confirmMotDePasse} // Valeur contrôlée par l'état confirmMotDePasse
        secureTextEntry // Masquer la confirmation du mot de passe
      />

      <TouchableOpacity style={styles.button} onPress={inscrireUtilisateur} >
      
         <Text style={styles.buttonText}>Inscription</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
  },
  logo: {
    position: 'absolute',
    top: "5%",
    left: "5%",
    width: "15%",
    height: "5%",
    backgroundColor: '#52a311',
    padding: 10,
    borderRadius: 50,
    width: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#797979',
  },
  button: {
    backgroundColor: '#52a311',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default Inscription;
