import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({userid }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {/* Logo de l'application */}
      <TouchableOpacity onPress={() => navigation.navigate('Page_acceuil')}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      {/* Spacer pour pousser les éléments à droite */}
      <View style={{ flex: 1 }} />

      {/* Icône de notification */}
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="notifications" size={24} color="grey" />
      </TouchableOpacity>

      {/* Photo de profil de l'utilisateur */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profil', { userid: userid })}>
        <Image source={require('../img/Ellipse71.png')} style={styles.userImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 110,
    height: 76,
  },
  iconContainer: {
    marginLeft: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
};
export default Header;
