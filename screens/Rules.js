import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import styles from '../styles';

import JuniperText from './JuniperText';

const RulesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <JuniperText content={"Règle du jeu Juniper Green"} style={styles.alignText} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}
      >
        <JuniperText content={"[ Revenir sur la page principale ]"}  style={styles.btnNav} />
      </TouchableOpacity>
      <JuniperText content={"Le jeu possède trois règles :"} style={styles.alignTextSecond} />
      <JuniperText content={"Le Joueur 1 choisit un nombre entre 1 et 100. À tour de rôle, chaque joueur doit choisir un nombre parmi les multiples ou les diviseurs du nombre choisi précédemment par son adversaire et inférieur à 100."} 
        style={styles.alignTextSecond}  />
      <JuniperText content={"Un nombre ne peut être joué qu'une seule fois."} style={styles.alignTextSecond} />
      <JuniperText content={"Le perdant étant le joueur qui ne trouve plus de multiples ou de diviseurs communs au nombre précédemment choisi."} 
      style={styles.alignTextSecond} />
    </SafeAreaView>
  );
}

export default RulesScreen;