import React ,{useState, useEffect} from 'react'
import { View, StyleSheet ,Modal, Button} from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import { Header } from 'react-native/Libraries/NewAppScreen'
import HeaderButton from '../components/HeaderButton'
import  ModalStack,{ModalStackProps} from '../components/ModalStack'
import MyTasks from '../screen/task'
import TaskDetail from '../screen/task/TaskDetail'

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




const taskDetailModal: React.FC<ModalStackProps> = (props) => {  
  const [taskId, setTaskId] = useState('')
  useEffect(()=>{
    const title = props.navigation.getParam('TASK_ID')
    setTaskId(title || null)
  },[])
  return (
    <ModalStack {...props} header={taskId?taskId:'Create New Task'}>          
      <TaskDetail {...props}/>
    </ModalStack>
  )
}

const navigationOptionsa = (navData: any,props: Props1) => {    
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
  TaskDetailModal: {
    screen: taskDetailModal
  }
}, {
  mode: 'modal',
  headerMode: 'none',
})

export default MyTaskStack
