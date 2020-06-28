import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';


import { select, play, reset } from '../actions/actions-types';

import styles from '../styles';
import JuniperText from './JuniperText';

const GameScreen = ({ navigation }) => {

  const dispatch = useDispatch(); // Redux Hook
    // préparation des propriétés du store Redux juniper
    const { choices, number, lastChoice, userChoices, computerChoices, computerNumber, errorMsg, errorPresentNumber, end } = useSelector(state => {
      return {
          choices: state.juniper.choices,
          number: state.juniper.number,
          lastChoice: state.juniper.lastChoice,
          userChoices: state.juniper.userChoices,  
          computerChoices: state.juniper.computerChoices, 
          computerNumber: state.juniper.computerNumber,   
          errorMsg: state.juniper.errorMsg,  
          errorPresentNumber: state.juniper.errorPresentNumber,  
          end:state.juniper.end,  
      }
  });

  useEffect(() => {
    if(end == true){
    console.log("fin")
    navigation.navigate('Score')}
  }, [end]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <JuniperText content={"Game Juniper Green"}  style={styles.alignText}  />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btnNav}>[ Revenir sur la page principale ]</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Rules')}
      >
        <Text style={styles.btnNav}>[ Les règles du jeu ]</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch(reset())}
      >
        <Text style={styles.btnNav}>[ Reset ]</Text>
      </TouchableOpacity>
      <JuniperText content={"C'est à vous !"} fontSize={16} />
      <JuniperText content={"Computer : "+ (computerNumber == '' ? '' : computerNumber)} fontSize={16} />
      <JuniperText content={"Votre choix : [ "+ (lastChoice == '' ? '' : lastChoice)+" ]"} fontSize={16} />

      <TextInput
        keyboardType="number-pad"
        placeholder="Number"
        style={styles.input}
        onChangeText={text => dispatch(select(text))}
        value={number}
    />

  {errorMsg && <Text style={{color:"red"}}>Veuillez saisir un chiffre ou nombre valide compris entre 1 et 100</Text> }
  {errorPresentNumber && <Text style={{color:"red"}}>Le nombre a déjà été donné, veuillez proposer un autre chiffre</Text> }
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch(play())}
      >
        
      <Text style={styles.btnNav}>[ Valider ]</Text>
      </TouchableOpacity>
    

      <View style={{flex: 1, flexDirection: 'row', marginTop:30, marginBottom:40}}>
      
        <View style={{ width: 200 }}>
          <Text>Vos choix :</Text>
          {userChoices.map((numb, i) => <Text key={i} key={i}>{numb}</Text>)}
        </View>
        
        <View style={{ width: 200 }}>
          <Text>Choix du computer :</Text>
          {computerChoices.map((numb, i) => <Text key={i} key={i}>{numb}</Text>)}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default GameScreen;