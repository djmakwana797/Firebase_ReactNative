import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import SignIn from '../../screens/SignIn'
import SignUp from '../../screens/SignUp';
import Home from '../../screens/Home';
import AddProduct from '../../screens/AddProduct';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'

const Stack = createNativeStackNavigator()

const Navigation = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


  return (
    <NavigationContainer>
      {user ?
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Add Product' component={AddProduct} />
        </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
      }

    </NavigationContainer>
  );
};

export default Navigation;
