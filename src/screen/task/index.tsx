import React, {Component} from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'
import { BorderlessButton } from 'react-native-gesture-handler'

interface Props extends NavProps {

}

const {width, height} = Dimensions.get('window');
const list = [
    {
      id: 1,
      name: 'All Items',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'EE'
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
  
   const col = 2
   const widthTask = ((width-20)/col) - 10

const MyTasks: React.FC<Props> = (props) => {   
        // console.log('customer props:',this.props)
  const renderItem = (itemData: any) =>{ 
    return(               
      <ListItem
          style={[styles.task,{width: widthTask}]}
          key={itemData.index}
          // leftAvatar={{ source: { uri: itemData.item.avatar_url } }}
          title={itemData.item.name}
          subtitle={itemData.item.subtitle}
          // topDivider = {false}
          onPress = {()=>onItermPress(props,itemData.item)}          
          
      />            
    ) 
  }
 
  return(   
    <FlatList
        style={[styles.container,{width: width}]}
      data = {list}
      numColumns={col}
      keyExtractor={(item, index) => index.toString()}
      renderItem = {(itemData) => {
          // console.log('itemdata',itemData)
          return renderItem(itemData)
      }}
    
    />    
  )
}

const styles = StyleSheet.create({
    container:{     
       padding: 10,
    //    backgroundColor: 'yellow'
    //    alignItems: 'center'
      
    },
    task:{
        margin: 5,
        borderWidth: 1,
        // backgroundColor:'red',
        borderColor: 'rgb(234, 242, 244)',
        borderStyle: 'solid'
        // shadowColor: 'red',
        // shadowOpacity: 1
    }
})
export default MyTasks