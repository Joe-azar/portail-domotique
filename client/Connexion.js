import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';

const Connexion = ({ navigation }) => {
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
        placeholder="Email"
        placeholderTextColor="#666"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Homepages')}>
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