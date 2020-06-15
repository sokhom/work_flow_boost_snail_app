import React, {Component} from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Text } from 'react-native-elements'

interface Props {

}
interface State {}

const CheckOut: React.FC<Props> =(props) =>{

    
    return(
        <View>
            <Text>CheckOut</Text>
            {props.children}           
        </View>
    )
    
}

export default CheckOut