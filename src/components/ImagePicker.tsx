import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Alert, Dimensions} from 'react-native';
import {Button} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {NavProps} from '../utils/NavProps'
import Colors from '../constants/Colors';


interface Props extends NavProps {
  requestCameraHandler: (image: string) => void
}
const {width, height} = Dimensions.get('window');

const ImgPicker = (props: Props) => {
  const [pickedImage, setPickedImage] = useState('') 

  const verifyCaramaPermissions = async () => {
    // const result = await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.requestCameraPermissionsAsync()    
    if (result.status !== 'granted') { 
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  useEffect(()=>{
     ( async () => {
      const {status} = await ImagePicker.requestCameraRollPermissionsAsync()
      if(status !=='granted'){
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant camera permissions to use this app.',
          [{ text: 'Okay' }])     
      }
    })     
  },[])
  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!image.cancelled) {
      props.requestCameraHandler(image.uri)
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyCaramaPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if(!image.cancelled){
      setPickedImage(image.uri)
      props.requestCameraHandler(image.uri)
    }
  };



  return (
    <View style={styles.container}>     
      <Button
        style={[styles.takePhoto,{width: width}]}
        title="Take Photo"
        titleStyle={{color: Colors.primary}}         
        type="outline"
        onPress={takeImageHandler}
      />     
      <Button 
        style={styles.buttonPhotoGallory} 
        title="Choose photos from gallory" 
        type="clear"
        onPress={pickImage}
      />
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    padding: 10    
  },
  takePhoto: {
    width: '100%',
    padding: 10
  },
  buttonPhotoGallory: {
    width: '100%',
    padding: 10
  }
   
});

export default ImgPicker;
