import React, { useState } from 'react'
import {View, StyleSheet, Dimensions, Alert} from 'react-native'
import {Button, Text} from 'react-native-elements'
import * as Contacts from 'expo-contacts'
import {NavProps} from '../utils/NavProps'
import {ContactProps} from './AddressBookCompo'

interface Props extends NavProps{
    contactSelection: (contact: Contact) => void
}
export interface Contact extends ContactProps{}

const {width, height} = Dimensions.get('window');
const AddressBook: React.FC<Props> = (props) => {
    // const [address1, setAddrress] = useState<Contacts.Contact[]>()
    
    const getContactsList= async() => {        
          props.navigation.navigate('AddressBookModal',{itemSelectionHandler: props.contactSelection})
    }
    return(
        <View style={styles.container}>
        <Button 
            style={[styles.addressBook,{width: width - 20}]} 
            type='outline' 
            title='Add from Address Book'
            onPress={getContactsList}
        />
       
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    addressBook:{
        // padding: 10,
        backgroundColor:'rgb(228, 229, 234)'
    }
})

export default AddressBook