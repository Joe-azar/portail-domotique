import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inscription from './Inscription';
import Profil from './Profil';
import Connexion from './Connexion';
import Page_acceuil from './Page_acceuil';
import Homepages from './Homepages';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Page_acceuil">
      <Stack.Screen name="Homepages" component={Homepages} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Page_acceuil" component={Page_acceuil} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
