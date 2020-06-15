import React ,{useState} from 'react'
import { View, StyleSheet ,Modal, Button} from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import { Header } from 'react-native/Libraries/NewAppScreen'
import HeaderButton from '../components/HeaderButton'
import MyTasks from '../screen/task'

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation'


interface Props  {
  navigation: NavigationScreenProp<NavigationState,NavigationParams>,
  actionMenu?: () => void
}

interface Props1 {
  actionMenu?: () => void
}



const myModal: React.FC<Props> = (props) =>{
  const [modalVisible, SetModalVisible] = useState(true)
  return (
    <View  
      style={{width:'20%', height:'40%',
        backgroundColor:'red',
        margin: 15
      }}
    >
      <Button
        title = 'Close Modal'
        onPress = {()=> props.navigation.goBack()}
      />
        <Text>HHHHHH</Text>
      </View>
  )
}
const navigationOptionsa = (navData: any,props: Props1) => {
    // console.log(navData)
    return {
        headerTitle: 'Tasks',
        headerLeft: (
             <Icon  style={{padding: 10}} name='ios-menu' size= {23} type='ionicon' 
              onPress={()=>{navData.navigation.toggleDrawer()}}
             >Menu</Icon>
        ),
        headerRight: (
            <Icon  style={{padding: 10}} name='ios-add' size= {23} type='ionicon' 
              onPress = {() => {}}
            >add</Icon>
        )
    }    
}
const config = (props: Props1) => {
  return {
    MyTasks: {
      screen: MyTasks,
      navigationOptions: (navData: any) =>  navigationOptionsa(navData,{...props})
    }
 }
}
const props = {  
  actionMenu: () => {
    console.log('Helllo')
  }
}
const MainStack = createStackNavigator(config({...props}))
const MyTaskStack = createStackNavigator({
  MyTasks: {
    screen: MainStack
  },
  MyModalCheckOut: {
    screen: myModal
  }
}, {
  mode: 'modal',
  headerMode: 'none',
})

export default MyTaskStack
