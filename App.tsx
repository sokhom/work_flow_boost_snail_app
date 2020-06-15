import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/redux/Store'
import MainNavigation from './src/navigation/MainNavigation'

export default function App() {
  return ( 
    <Provider store = {configureStore().store}>
      <PersistGate loading = {null} persistor = {configureStore().persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
