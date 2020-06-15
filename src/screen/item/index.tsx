import React, {Component} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'

const list = [
    {
      id: 1,
      name: 'All Items',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: ''
    },
    {
      id: 2,
      name: 'Categories',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
    {
      id: 3,
      name: 'Group',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Group of itms'
    },
    {
      id: 4,
      name: 'UoM',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Unit of Measurement'
    }
  ]

interface Props extends NavProps {} 
interface State {}

const onItermPress=(props:Props,item: any)=>{
  // console.log('onItermPress', item.name)
  let goTo = ''
  switch(item.name){
    case 'Categories':{
      props.navigation.navigate('Categories') 
      return 
    }        
    case 'All Items': { 
      props.navigation.navigate('ItemList') 
      return
    }
    default: return
  }  
}

const Items: React.FC<Props> = (props) => {   
        // console.log('customer props:',this.props)
  const renderItem = (itemData: any) =>{ 
    return(               
      <ListItem
          key={itemData.index}
          // leftAvatar={{ source: { uri: itemData.item.avatar_url } }}
          title={itemData.item.name}
          subtitle={itemData.item.subtitle}
          // topDivider = {false}
          onPress = {()=>onItermPress(props,itemData.item)}
          bottomDivider
          chevron
      />            
    ) 
  }
 
  return(   
    <FlatList
      data = {list}
      // keyExtractor={(item, index) => index.toString()}
      renderItem = {(itemData) => {
          // console.log('itemdata',itemData)
          return renderItem(itemData)
      }}
      style={{ width: '100%' }}
    />    
  )
}

export default Items