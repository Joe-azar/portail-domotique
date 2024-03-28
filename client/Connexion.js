import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  

  const verifierUtilisateur = () => {
    fetch('http://172.20.10.3:3000/api/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, motDePasse }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Connexion réussie') {
        // Stocker le token reçu après la connexion
        //AsyncStorage.setItem('userToken', token);
        navigation.navigate('Homepages');
      } else {
        Alert.alert('Erreur', data.message || 'Un problème est survenu.');
      }
    })
    
    .catch((error) => {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Un problème est survenu lors de la tentative de connexion.');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button1} 
        onPress={() => navigation.navigate('Page_acceuil')}
      >
        <Text style={styles.buttonText}> ⇦ Retour à la page précedente</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Content de vous revoir! 😄</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#666"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        onChangeText={setMotDePasse}
        value={motDePasse}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button1} onPress={verifierUtilisateur}>
        <Text style={styles.buttonText}>Me Connecter</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
  },
  title: {
    marginTop:100,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button1: {
    backgroundColor: '#52a311',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Connexion;