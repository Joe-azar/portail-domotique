import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput,FlatList } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';
import { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import Video from 'expo-av';

import Header from './components/Header';
import LicensePlateList from './components/LicencePlateList';
import LastEntryList from './components/LastEntryList';
import ModalAnimate from './components/ModalAnimate';


export default function Homepages({ navigation, route }) {
  const [modalOpenPortalVisible, setModalOpenPortalVisible] = useState(false)
  const [modalOpenCamera, setModalOpenCamera] = useState(false)
  const [modalAddPlate, setModalAddPlate] = useState(false)
  const [licensePlates, setLicensePlates] = useState([]);
  const [newPlate, setNewPlate] = useState('');
  const [streamUrl, setStreamUrl] = useState(''); // Initialize streamUrl state
  const userid = route.params.userid;
  
  const supprimerPlaque = (plateId) => {
    fetch(`http://172.20.10.3:3000/api/deleteLicensePlate/${plateId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Plaque supprimée:', data);
      loadLicensePlates(); // Rechargez les plaques pour mettre à jour la liste
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de la plaque:', error);
    });
  };
  
  const ajouterPlaque = () => {
    // Ici, vous pouvez ajouter une validation de la nouvelle plaque si nécessaire
    fetch('http://172.20.10.3:3000/api/addLicensePlate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userid, // Assurez-vous que cette variable contient l'ID de l'utilisateur
        licensePlate: newPlate,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.exists) {
        // La plaque existe déjà, gérer selon le besoin (par exemple, afficher un message)
        alert('Cette plaque est déjà enregistrée.');
      } else {
      console.log('Plaque ajoutée:', data);
      // Ici, vous pouvez fermer le modal et rafraîchir la liste des plaques ou gérer les erreurs
      setModalAddPlate(false);
      loadLicensePlates(); // Rechargez les plaques pour afficher la nouvelle
      }
    })
    .catch((error) => {
      console.error('Erreur lors de l\'ajout de la plaque:', error);
    });
  };
  
  const loadLicensePlates = () => {
    fetch(`http://172.20.10.3:3000/api/licensePlates/${userid}`)
      .then(response => response.json())
      .then(data => {
        setLicensePlates(data.licensePlates);
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  };
  useEffect(() => {
    if (userid) {
      loadLicensePlates(userid);
    }
  }, [userid]);
    ///////////////////////////////////////////////////////////////
    const ouvrirPortail = () => {
      // newState est la nouvelle valeur pour l'attribut "state", par exemple 1
      fetch('http://172.20.10.3:3000/api/changeState', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid ,
          // la nouvelle valeur de "state" que vous souhaitez définir
        }),
      })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          console.log(data);
          // Ici, vous pouvez par exemple rafraîchir les données affichées à l'utilisateur
        } else {
          console.error('Erreur lors du changement de l\'état:', data.message);
          // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
    };
  
    //////////////////////////////////////////////////////////////

  useEffect(() => {
    fetch('http://172.20.10.3:3000/api/cameraStreamUrl')
        .then((response) => response.json())
        .then((data) => {
            setStreamUrl(data.url);
        })
        .catch((error) => {
            console.error('Failed to load stream URL:', error);
        });
}, []);
const MyVideoPlayer = () => (
  <Video source={{uri: "http://172.20.10.3:3000/api/cameraStreamUrl"}}   // The video stream URL
         ref={(ref) => {
           this.player = ref
         }}                                     
         onBuffer={this.onBuffer}                
         onError={this.videoError}               
         style={styles.backgroundVideo} />
);
  


  return (
    <View style={styles.container}>
      <ModalAnimate isModalVisible={modalOpenPortalVisible} setModalVisible={setModalOpenPortalVisible}>
        <Text style={styles.modalTitle}>Ouverture du portail en cours...</Text>
      </ModalAnimate>
      <ModalAnimate isModalVisible={modalOpenCamera} setModalVisible={setModalOpenCamera}>
      <Text style={styles.modalTitle}>Vue de la caméra</Text>
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        source={{ uri: streamUrl }} // Update with your actual URL
      />
      </ModalAnimate>


      <ModalAnimate isModalVisible={modalAddPlate} setModalVisible={setModalAddPlate}>
        <Text style={styles.modalTitle}>Ajouter une plaque</Text>
        <TextInput
          style={styles.input}
          placeholder="XX - 123 - XX"
          placeholderTextColor="#757575"
          onChangeText={setNewPlate} // Mettre à jour l'état avec la valeur saisie
          value={newPlate}
        />
        <TouchableOpacity style={styles.buttonGrey} onPress={ajouterPlaque}>
          <Text style={styles.buttonTextGrey}>Ajouter la plaque</Text>
        </TouchableOpacity>
      </ModalAnimate>

      <StatusBar />
      <Header navigation={navigation} userid={userid}/>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.button,styles.leftButton]} onPress={() => {ouvrirPortail();setModalOpenPortalVisible(true); }}>
        <Text style={[styles.buttonText, styles.rightButton]}>Ouvrir mon portail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setModalOpenCamera(true)}>
                <Text style={styles.buttonText}>Voir devant mon portail</Text>
      </TouchableOpacity>
    </View>
      <LicensePlateList
        
          onButtonPress={() => setModalAddPlate(true)}
          licensePlates={licensePlates}
          supprimerPlaque={supprimerPlaque}
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