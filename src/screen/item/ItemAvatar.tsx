import React, { useState } from 'react'
import {StyleSheet, View, ScrollView, FlatList, Text, Dimensions } from 'react-native'

import {Icon, Avatar, ListItem, Tile} from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'
import ImagePicker from '../../components/ImagePicker'
import LabelColor from '../../components/LabelColor'
// import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';



interface Props extends NavProps {}

const ItemAvatar: React.FC<Props> = (props) => {

    const [pickedImage1, setPickedImage] = useState('');
    const selectLabelColorHandler = props.navigation.getParam('selectLabelColorHandler')

    const cameraHandler = (image:string ) => {
        setPickedImage( image) 
    }

    return (
        <ScrollView style={styles.container} scrollEnabled={true}>            
            <LabelColor {...props} onPressColor={selectLabelColorHandler} pickedImage = {pickedImage1} />
            <ImagePicker {...props} requestCameraHandler={cameraHandler}/>              
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        padding: 10
       
    }
  });
export default ItemAvatar