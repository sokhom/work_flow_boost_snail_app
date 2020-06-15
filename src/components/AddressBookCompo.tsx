import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Dimensions, Alert, FlatList} from 'react-native'
import {Button, Text, ListItem, ButtonGroup} from 'react-native-elements'
import * as Contacts from 'expo-contacts'
import {Contact} from 'expo-contacts'

import {NavProps} from '../utils/NavProps'

export interface ContactProps{
    firstName?: string,
    lastName?: string,
    name: string
}
interface Props extends NavProps{

}

const {width, height} = Dimensions.get('window');
const AddressBookCompo: React.FC<Props> = (props) => {
    const [address, setAddrress] = useState<ContactProps[]>()
    const [group, setGroup] = useState([''])
    const itemSelectionHandler = props.navigation.getParam('itemSelectionHandler')

    const verifyContactPerssion = async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status !== 'granted') { 
            Alert.alert(
              'Insufficient permissions!',
              'You need to grant contacts permissions to use this app.',
              [{ text: 'Okay' }]
            );
            return false;
          }
          return true;
    }
    useEffect(()=>{
        (async()=>{
            const status = verifyContactPerssion()
            if(!status) return
            const { data } = await Contacts.getContactsAsync({
                fields: [
                    Contacts.Fields.Emails,
                    Contacts.Fields.FirstName,
                    Contacts.Fields.LastName,
                    Contacts.Fields.PhoneNumbers,
                    Contacts.Fields.Addresses,
                    Contacts.Fields.ContactType
                ]
            })
            if(data.length > 0){
                const arr = data.slice(0,20).filter(contact=>{
                    const name = (contact.firstName || '')+ (contact.lastName || '')
                    if(name!=''){
                        return {
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            name: name
                        }
                    }                    
                })

                const sort = arr.sort((a,b)=> {
                    return a.name.localeCompare(b.name)
                })
                setAddrress(sort)
                setGroup(sort.map((contact)=> contact.name.substring(0,1) ))
                // console.log('contact=========================',arr.sort((a,b)=> {
                //     return b.name.localeCompare(a.name)
                // }))
            }
        })()
    },[])
    const selectionItemHandler= (item: ContactProps) => {        
        itemSelectionHandler(item)
        props.navigation.goBack()
    }
    return(
        <View style={[styles.container,{height: height-60}]}>        
            <FlatList
                data = {address}
                keyExtractor = {(item, index) => index.toString()}
                scrollEnabled={true}
                renderItem={(itemData)=>{
                    const {item, index} = itemData
                    return(
                    <ListItem
                        key={index}
                        title={item.name}
                        leftIcon={{name:'ios-contact', size: 30,  type:'ionicon'}}
                        // buttonGroup= {{buttons: group,vertical: false, onPress:()=>{} }}
                        onPress = {()=>selectionItemHandler(item)}
                        bottomDivider
                    />
                )
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        // marginBottom:50,
        // backgroundColor: 'red'
        
    },
    addressBook:{
        // padding: 10,
        backgroundColor:'rgb(228, 229, 234)'
    }
})

export default AddressBookCompo