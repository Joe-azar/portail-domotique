import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Button } from 'react-native';

const Inscription = ({ navigation }) => {
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
      />
      <TextInput
        style={styles.input}
        placeholder="Prenom"
        placeholderTextColor="#D7D7D7"
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#D7D7D7"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#D7D7D7"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer votre mot de passe"
        placeholderTextColor="#D7D7D7"
      />

<TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Inscriptions</Text>
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
