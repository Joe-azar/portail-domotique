import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import Header from './components/Header';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const Profil = ({ route , navigation}) => {
  const [user, setUser] = useState({ nom: '', prenom: '', email: '' });
  const userid = route.params.userid;
  
  useEffect(() => {
    fetch(`http://172.20.10.3:3000/api/user/${userid}`)
      .then(response => response.json())
      .then(data => {
        
        setUser({ nom: data.nom, prenom: data.prenom, email: data.email, image: data.image ? `data:image/jpg;base64,${data.image}` : './img/Ellipse71.png' });
      })
      .catch(error => console.error('Erreur:', error));
  }, [userid]); // Dépendance à userId pour recharger si l'ID change
  const openCamera = async () => {
    // Request the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to grant camera access to use this feature');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Optional: Allows editing the image before returning
      aspect: [4, 3], // Aspect ratio to maintain if allowsEditing is true
      quality: 1, // Quality of the captured image
      base64: true, // Return the image in Base64
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    // Assuming you have a function to handle the upload
    const base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    console.log('Base64 Image Data:', base64Image);
    console.log('Base64 raw data:', pickerResult.base64);
    //console.log('Picker Result:', pickerResult);
    uploadImage(base64Image);
  };

  // Example function to demonstrate image upload logic
  const uploadImage = async (base64Image) => {
    const url = 'http://172.20.10.3:3000/api/uploadImage';
    const body = JSON.stringify({
        userid: userid, // Make sure 'userid' is correctly defined in your component
        image: base64Image,
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });

        const jsonResponse = await response.json();
        if (response.ok) {
            console.log(jsonResponse.message); // Log the success message
            Alert.alert('Upload Successful', jsonResponse.message);
        } else {
            throw new Error(jsonResponse.message || 'Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Error', error.toString());
    }
};

  

  return (
    <View style={styles.container}>
    
    <Header style={styles.header} navigation={navigation} userid={userid}/>
    <StatusBar />
    <Image source={require('./img/Ellipse71.png')} style={styles.ellipse} />
      <Text style={styles.text_right}>{`${user.prenom} ${user.nom}`}</Text>
      <Text style={styles.text_right1}>{user.email} 
      <TouchableOpacity>
        <Text style={styles.buttonChange}>Changer</Text>
      </TouchableOpacity>
      </Text>
      

      <TouchableOpacity>
        <Text style={styles.buttonModifier}>Modifier ma photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Ajouter une photo</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
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
    right: "30%",
    width: "50%",
    height: "20%",
  },
  text_right: {
    position: 'relative',
    bottom:"15%",
    left: "15%",
    width: "50%",
    height: "20%",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  text_right1: {
    position: 'relative',
    bottom:"25%",
    left: "20%",
    width: "60%",
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
