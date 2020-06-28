import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RulesScreen from './screens/Rules';
import GameScreen from './screens/Game';
import ScoreScreen from './screens/Score';
import JuniperText from './screens/JuniperText';
import thunk from 'redux-thunk';

import styles from './styles';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
const store = createStore(reducer, applyMiddleware(thunk));

const HomeScreen = ({ navigation }) => {
  return (
    <>
        <View style={styles.container}>
          <JuniperText content={"Bienvenue voici le Jeu Juniper Green"} style={styles.alignText} />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Rules')}
          >
            <JuniperText content={"[ Les règles du jeu ]"} style={styles.btnNav}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Game')}
          >
            <JuniperText content={"[ Commencer une partie ]"} style={styles.btnNav}/>
          </TouchableOpacity>
        </View>
    </>
  )
    ;
}

const Stack = createStackNavigator();

const Nav = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => (
  <Provider store={store}>
    <Nav />
  </Provider>
);

export default App;