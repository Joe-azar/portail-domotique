import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, ScrollView, Text, View, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import BleManager from 'react-native-ble-manager';

import Header from './components/Header';
import LicensePlateList from './components/LicencePlateList';
import LastEntryList from './components/LastEntryList';
import ModalAnimate from './components/ModalAnimate';


export default function Homepages({ navigation }) {
  const [modalOpenPortalVisible, setModalOpenPortalVisible] = useState(false)
  const [modalOpenCamera, setModalOpenCamera] = useState(false)
  const [modalAddPlate, setModalAddPlate] = useState(false)
  const [gateStatus, setGateStatus] = useState('Fermé');
  const [deviceConnected, setDeviceConnected] = useState(false);

  // Empty Array
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    /* /api directement car on a mis "proxy" à localhost:5000 dans le package.json
    l'adresse réelle est http://localhost:5000/api */

    fetch("/api").then(
      // Donnée du serveur (ok ou notok)
      response => response.json()
    ).then(
      // On récupére les données dans backendData si tout est ok
      data => {
        setBackendData(data)
        console.log(data)
      }
    )
  }, [])

  useEffect(() => {
    // Fonction pour initialiser la bibliothèque Bluetooth
    const initializeBluetooth = async () => {
      try {
        await BleManager.start({ showAlert: false });
        console.log('Bluetooth initialized');
      } catch (error) {
        console.error('Error initializing Bluetooth:', error);
      }
    };

    // Appeler la fonction pour initialiser la bibliothèque Bluetooth
    initializeBluetooth();

    // Nettoyer les ressources lorsque le composant est démonté
    return () => {
      // Code pour nettoyer les ressources Bluetooth si nécessaire
    };
  }, []);

  // Fonction pour rechercher et connecter le périphérique Bluetooth
  const connectToDevice = async () => {
    try {
      // Code pour rechercher et connecter le périphérique Bluetooth
      // Utilisez les méthodes fournies par la bibliothèque Bluetooth pour rechercher et connecter le périphérique approprié
      // Exemple :
      await BleManager.scan([], 10); // Scanner les périphériques Bluetooth pendant 10 secondes
      await BleManager.connect(deviceId); // Connecter le périphérique Bluetooth avec l'ID spécifié
      // Mettre à jour l'état pour indiquer que le périphérique est connecté
      setDeviceConnected(true)
      console.log("Device connected")
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  // Fonction pour envoyer la commande de contrôle du portail via Bluetooth
  const openGate = async () => {
    if (!deviceConnected) {
      console.log('Device not connected');
      return;
    }

    try {
      // Code pour envoyer la commande via Bluetooth
      // Utilisez les méthodes fournies par la bibliothèque Bluetooth pour écrire des données au périphérique approprié
      // Exemple :
      // await BleManager.write(deviceId, serviceUUID, characteristicUUID, data, maxByteSize)

      // Mettez à jour le statut du portail
      setGateStatus('Ouverture en cours...');
    } catch (error) {
      console.error('Error writing to device:', error);
    }
  };

  return (
    //<ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>


      <ModalAnimate isModalVisible={modalOpenPortalVisible} setModalVisible={setModalOpenPortalVisible}>
        <Text style={styles.modalTitle}>Ouverture du portail en cours...</Text>
      </ModalAnimate>
      <ModalAnimate isModalVisible={modalOpenCamera} setModalVisible={setModalOpenCamera}>
        <Image
          source={require('./img/user_pic.png')}
          style={styles.imageStyle}
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
      <Header navigation={navigation} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => { setModalOpenPortalVisible(true); connectToDevice}}>
          <Text style={[styles.buttonText, styles.rightButton]}>Ouvrir mon portail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.fixedButton]} onPress={() => setModalOpenCamera(true)} >
          <Text style={styles.buttonText}>Voir devant mon portail</Text>
        </TouchableOpacity>
      </View>
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
    //</ScrollView>
  );
}

const styles = {
  container: {
    backgroundColor: '#2D2D2D', // Couleur de fond
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 70,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust spacing between buttons
    alignItems: 'center',
    marginTop: -10,
  },
  button: {
    marginTop: 20,
    width: "48%",
    alignSelf: "center",
    backgroundColor: '#52A311',
    borderRadius: 100,
    padding: 10,
    alignItems: "center"
  },
  leftButton: {
    marginRight: 10, // Optional: Add margin to separate buttons
  },
  rightButton: {
    marginLeft: 10, // Optional: Add margin to separate buttons
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
    fontSize: 12,
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
}