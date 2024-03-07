import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, ScrollView, Text, View, TextInput,FlatList } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';


import Header from './components/Header';
import LicensePlateList from './components/LicencePlateList';
import LastEntryList from './components/LastEntryList';
import ModalAnimate from './components/ModalAnimate';


export default function Homepages({ navigation }) {
  const [modalOpenPortalVisible, setModalOpenPortalVisible] = useState(false)
  const [modalOpenCamera, setModalOpenCamera] = useState(false)
  const [modalAddPlate, setModalAddPlate] = useState(false)

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
    

      <ModalAnimate isModalVisible={modalOpenPortalVisible} setModalVisible={setModalOpenPortalVisible}>
        <Text style={styles.modalTitle}>Ouverture du portail en cours...</Text>
      </ModalAnimate>
      <ModalAnimate isModalVisible={modalOpenCamera} setModalVisible={setModalOpenCamera}>
  <Image
    source={require('./img/user_pic.png')} // Update the path to the location of your image file
    style={styles.imageStyle} // Define a style for your image if needed
  />
</ModalAnimate>

      <ModalAnimate isModalVisible={modalAddPlate} setModalVisible={setModalAddPlate}>
        <Text style={styles.modalTitle}>Ajouter une plaque</Text>
          <TextInput
            style={styles.input}
            placeholder="XX - 123 - XX"
            placeholderTextColor="#757575"
          />
        <TouchableOpacity style={styles.buttonGrey}>
          <Text style={styles.buttonTextGrey}>Ajouter la plaque</Text>
        </TouchableOpacity>
      </ModalAnimate>

      <StatusBar />
      <Header navigation={navigation}/>

      <TouchableOpacity style={styles.button} onPress={() => setModalOpenPortalVisible(true)}>
        <Text style={styles.buttonText}>Ouvrir mon portail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.fixedButton]} onPress={() => setModalOpenCamera(true)} >
      <Text style={styles.buttonText}>Voir devant mon portail</Text>
    </TouchableOpacity>

      <LicensePlateList
        onButtonPress={() => setModalAddPlate(true)}
        licensePlates={[
          { id: 1, plateNumber: 'ABC123' },
          { id: 2, plateNumber: 'DEF456' },
          { id: 3, plateNumber: 'GH789' },
          { id: 4, plateNumber: 'ABC123' },
          { id: 5, plateNumber: 'DEF456' },
          { id: 6, plateNumber: 'GH789' },
          { id: 7, plateNumber: 'ABC123' },
          { id: 8, plateNumber: 'DEF456' },
          { id: 9, plateNumber: 'GH789' },
          { id: 10, plateNumber: 'ABC123' },
          { id: 12, plateNumber: 'DEF456' },
          { id: 13, plateNumber: 'GH789' },
          { id: 14, plateNumber: 'ABC123' },
          { id: 15, plateNumber: 'DEF456' },
          { id: 16, plateNumber: 'GH789' },
        ]}
      />

      <LastEntryList
        licencePlateHistory={[
          { id: 1, plateNumber: 'ABC123', timestamp: "1674100200000" },
          { id: 2, plateNumber: 'DEF456', timestamp: "1674100200000" },
          { id: 3, plateNumber: 'GH789', timestamp: "1674100200000" },
          { id: 4, plateNumber: 'ABC123', timestamp: "1674100200000" },
          { id: 5, plateNumber: 'DEF456', timestamp: "1674100200000" },
          { id: 6, plateNumber: 'GH789', timestamp: "1674100200000" },
          { id: 7, plateNumber: 'ABC123', timestamp: "1674100200000" },
          { id: 15, plateNumber: 'DEF456', timestamp: "1674100200000" },
          { id: 8, plateNumber: 'GH789', timestamp: "1674100200000" },
          { id: 9, plateNumber: 'ABC123', timestamp: "1674100200000" },
          { id: 10, plateNumber: 'DEF456', timestamp: "1674100200000" },
          { id: 11, plateNumber: 'GH789', timestamp: "1674100200000" },
          { id: 12, plateNumber: 'ABC123', timestamp: "1674100200000" },
          { id: 13, plateNumber: 'DEF456', timestamp: "1674100200000" },
          { id: 14, plateNumber: 'GH789', timestamp: "1674100200000" },
        ]}
      />
      
    </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    backgroundColor: '#2D2D2D', // Couleur de fond
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 70,
    flex: 1,
  },
  button: {
    marginTop: 30,
    width: "75%",
    alignSelf: "center",
    backgroundColor: '#52A311',
    borderRadius: 100,
    paddingVertical: 15,
    alignItems: "center"
  },
  buttonSubText: {
    marginTop: 8,
    marginBottom: 30,
    color: "#9F9F9F",
    textDecorationLine: 'underline', // Ajout d'un soulignement
    alignSelf: "center"
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGrey: {
    backgroundColor: '#757575',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 10
  },
  buttonTextGrey: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalTitle: {
    color: "#FFFFFF",
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#757575',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: '#FFFFFF',
  },
  imageStyle: {
    width: 200, // Set the width as per your requirement
    height: 200, // Set the height as per your requirement
    resizeMode: 'contain', // or 'cover', 'stretch', etc.
  },
}