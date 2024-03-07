import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import Header from './components/Header';
import { StatusBar } from 'expo-status-bar';
const Profil = ({ navigation }) => {
    

  return (
    <View style={styles.container}>
    
    <Header style={styles.header} />
    <StatusBar />
      <Image source={require('./img/Ellipse71.png')} style={styles.ellipse} />
      <Text style={styles.text_right}>Jan Doe</Text>
      <Text style={styles.text_right1}>adresse@mail.com 
      <TouchableOpacity>
        <Text style={styles.buttonChange}>Changer</Text>
      </TouchableOpacity>
      </Text>
      

      <TouchableOpacity>
        <Text style={styles.buttonModifier}>Modifier ma photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Changer mon mot de passe</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#515151',
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 70,
    flex: 1,
  },
  logo: {
    position: 'absolute',
    top: "5%",
    left: "5%",
    width: "15%",
    height: "5%",
  },
  frame: {
    position: 'absolute',
    top: "6%",
    right: "20%",
    width: "5%",
    height: "3%",
  },
  frame1: {
    position: 'absolute',
    top: "6%",
    right: "10%",
    width: "5%",
    height: "3%",
  },
  ellipse: {
    position: 'relative',
    top: "5%",
    right: "20%",
    width: "50%",
    height: "20%",
  },
  text_right: {
    position: 'relative',
    bottom:"10%",
    left: "30%",
    width: "50%",
    height: "20%",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  text_right1: {
    position: 'relative',
    bottom:"25%",
    left: "30%",
    width: "50%",
    height: "20%",
    fontSize: 18,
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
    backgroundColor: '#676767',
    padding: 10,
    borderRadius: 20,
    width: 300,
    bottom:100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
  },
  buttonChange: {
    top:"10%",
    color: '#A4A4A4',
    fontSize: 16,
  },
  buttonModifier: {
    textDecorationLine: 'underline',
    color: '#A4A4A4',
    fontSize: 16,
    bottom:150,
    right:60,
  },
});

export default Profil;
