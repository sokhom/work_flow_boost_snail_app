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
      name: 'IT-000154',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Enhancement'
    },
    {
      id: 2,
      name: 'SW-000504',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Financial Applications'
    },
    {
      id: 3,
      name: 'HR-000245',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Request new employee to fullfill the position IT.'
    },
    {
      id: 4,
      name: 'UoM',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Unit of Measurement'
    }
  ]
  
  const col = 1
  const widthTask = ((width-20)/col) - 6
  
  const MyTasks: React.FC<Props> = (props) => {   
    
    const onItermPress=(props:Props,item: any)=>{ 
      props.navigation.navigate('TaskDetailModal',{TASK_ID: item.name})    
    }

  const renderItem = (itemData: any) =>{ 
    const avatarTitle = (itemData.item.name || '').substring(0,2)
    return(               
      <ListItem
        style={col>1?[styles.task,{width: widthTask}]:[]}
        bottomDivider={col>1? false:true}
        key={itemData.index}
        leftAvatar={{ title:avatarTitle.toUpperCase(), size:'medium', rounded:true,containerStyle:styles.leftAvatar }}
        title={itemData.item.name}
        subtitle={itemData.item.subtitle}
        rightSubtitle={<View>
          <Text  style={{fontSize:11}}>ID: 12542</Text>
          <Text  style={{fontSize:11}}>Mrs. Sun Theary</Text>
          <Text  style={styles.dateTime}>Fri, June 16,2020 12:01 PM</Text>
        </View>}
        rightSubtitleStyle={{fontSize:11}}
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
        margin: 3,
        borderWidth: 1,
        // backgroundColor:'red',
        borderColor: 'rgb(234, 242, 244)',
        borderStyle: 'solid'
        // shadowColor: 'red',
        // shadowOpacity: 1
    },
    leftAvatar:{
      backgroundColor:'darkolivegreen',
      marginLeft: -10, 
      marginRight: 10
    },
    dateTime:{
      fontSize:11, color:'rgba(0, 0, 0, 0.54)', 
      fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'}
})

export default MyTasks