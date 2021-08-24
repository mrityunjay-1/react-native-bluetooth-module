import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './screens/HomeScreen';
import PrintScreen from './screens/PrintScreen';


const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PrintScreen" component={PrintScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;