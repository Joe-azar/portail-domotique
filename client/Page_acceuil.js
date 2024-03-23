import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Image } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

const Page_acceuil = ({navigation}) => {

  return (
    <View style={styles.container}>
    <Image source={require('./img/gate.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenue sur GateKeeper!</Text>

      <TouchableOpacity style={styles.button1}
      onPress={() => navigation.navigate('Inscription')}>
        <Text style={styles.buttonText}>Démarrer</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.button2} 
      onPress={() => navigation.navigate('Connexion')}
      >
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515151',
     justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 150,
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
    borderRadius: 20,
    marginBottom: 20,
  },
  button2: {
    backgroundColor: '#52a311',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: 200,
    textAlign:"center", 
  },
  logo: {
    marginTop:'25%',
    width: '45%', 
    height: '15%',
    resizeMode: 'contain',
    borderRadius: 1550,
  },
});

export default Page_acceuil;