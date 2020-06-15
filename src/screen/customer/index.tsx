import React, {Component} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
// import {CustomerModel} from '../../models/Item'


const list = [
    {
      id: 1,
      name: 'Amy Farha1',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      id: 2,
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }
  ]

interface Props {}
interface State {}

class Customer extends Component<Props, State> {
   
    render(){
        // console.log('customer props:',this.props)
        const renderItem = (itemData: any) =>{ 
            return(               
            <ListItem
                    key={itemData.in}
                    leftAvatar={{ source: { uri: itemData.item.avatar_url } }}
                    title={itemData.item.name}
                    subtitle={itemData.item.subtitle}
                    topDivider = {false}
                    
                    bottomDivider
                    chevron
                />            
            ) 
        }
        const actions = ['Add','Remove']
       const onPopupEvent = (eventName: string, index: number | undefined) => {

            console.log('from custom popup menu')
            
          }
        return(
            <View>
                <Text>Customers</Text>
                
                <FlatList
                    data = {list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {(itemData) => {
                        // console.log('itemdata',itemData)
                        return renderItem(itemData)
                    }}
                    style={{ width: '100%' }}
                /> 
            </View>
        )
    }
}

export default Customer