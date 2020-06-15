import React ,{useState} from 'react'
import { View, StyleSheet ,Modal, Button,} from 'react-native'
import { Text, Icon, Header} from 'react-native-elements'
import {NavProps} from '../utils/NavProps'


export interface ModalStackProps extends NavProps { 
    header?: String,
    leftIcon?: string,
    style?:[{}]
  } 
  
  const ModalStack: React.FC<ModalStackProps> = (props) => {
    const goBack= () =>{
      //  let goURL = props.navigation.getParam('goBack') || null
      //  if (goURL){
      //     props.navigation.navigate(goURL)
      //  }else{
         props.navigation.goBack()
      //  }
    }
    let leftIconName = props.leftIcon? props.leftIcon: 'times'
    return (
      <View  
        style={[{width:'100%', height:'100%',
          backgroundColor:'transperant',
          margin: 0
        },props.style]}
      >     
        <Header
          leftComponent={ 
            <Icon
              reverse = {false}
              size = {24}
              name={leftIconName}
              type='font-awesome'
              color='#5f6368'          
              onPress={goBack} 
            />
          }
          centerComponent={{ text: `${props.header}`, style: { color: '#fff' } }}
          // rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {props.children}
      </View>
    )
  }
  export default ModalStack