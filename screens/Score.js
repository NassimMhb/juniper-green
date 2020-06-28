import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';

  import JuniperText from './JuniperText';

  import styles from '../styles';
  import { useDispatch, useSelector } from 'react-redux';
  import { reset } from '../actions/actions-types';

const Score = ({ navigation }) => {

    const dispatch = useDispatch(); // Redux Hook

    const { userWin, computerWin, tour, userChoices, computerChoices} = useSelector(state => {
        return {
            userWin: state.juniper.userWin,
            computerWin: state.juniper.computerWin,
            tour: state.juniper.tour,
            userChoices: state.juniper.userChoices,  
            computerChoices: state.juniper.computerChoices, 
        }
    });

    const replay = () => {
        dispatch(reset())
        navigation.navigate('Game')
    }

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <JuniperText content={"Game Juniper Green"}  style={styles.alignText}  />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Home')}
        >
          <JuniperText content={"[ Revenir sur la page principale ]"} style={styles.btnNav}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => replay()}
        >
            <JuniperText content={"[ Rejouer ? ]"} style={styles.btnNav}/>
        </TouchableOpacity>
        <Text>Le jeu est terminé, {userWin && !computerWin ? "vous avez gagné" : "l'ordinateur a gagné"} en {tour} tour(s).</Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop:30, marginBottom:40}}>
      
        <View style={{ width: 200 }}>
            <JuniperText content={"Vos choix :"} style={""}/>
            {userChoices.map((numb, i) => <Text key={i} key={i}>{numb}</Text>)}
        </View>
        
        <View style={{ width: 200 }}>
            <JuniperText content={"Choix du computer :"} style={""}/>
            {computerChoices.map((numb, i) => <Text key={i} key={i}>{numb}</Text>)}
        </View>
        </View>
      </SafeAreaView>
    );
}

export default Score;
