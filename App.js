import React, { useState } from 'react';

// stack navigator
import RootStack from './navigators/RootStack';

// app loading
import Apploading from 'expo-app-loading';
// storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credential context
import { CredentialsContext } from './components/CredentialsContext';

export default function App() {

  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = async () => {
    try {
      const data = await AsyncStorage.getItem('nikeshoesSampleCredentials');
      if(data !== null) {
        setStoredCredentials(JSON.parse(data))
      } else {
        setStoredCredentials(null);
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(!appReady) {
    return (
      <Apploading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn}/>
    )
  }

  return (
   <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack/>
   </CredentialsContext.Provider>
  );
}