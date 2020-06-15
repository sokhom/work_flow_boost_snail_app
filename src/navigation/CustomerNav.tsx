import React ,{useState} from 'react'
import { View, StyleSheet ,Modal, Button} from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import { Header } from 'react-native/Libraries/NewAppScreen'
import HeaderButton from '../components/HeaderButton'
import Customer from '../screen/customer'
import  ModalStack,{ModalStackProps} from '../components/ModalStack'
import AddCustomer from '../screen/customer/AddCustomer'
import AddreessBookComp from '../components/AddressBookCompo'

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

const checkOut: React.FC<Props> = (props) => {
  
  return (
    <View>
      <Customer {...props}>   
       
      </Customer>      
    </View>
  )
}

const categoryModal: React.FC<ModalStackProps> = (props) => {  
  return (
    <ModalStack {...props} header='Create New Customer'>          
      <AddCustomer {...props}/>
    </ModalStack>
  )
}

const addressBookModal: React.FC<ModalStackProps> = (props) => {  
  return (
    <ModalStack {...props} header='Contacts'>          
      <AddreessBookComp {...props}/>
    </ModalStack>
  )
}

const genderSelectionModal: React.FC<ModalStackProps> = (props) => {  
  return (
    <ModalStack style={[{flex:1,backgroundColor:'transparent',margin:20,hight:'100%'}]} {...props} header='Select gender' leftIcon='angle-left'>          
      <Text style={{backgroundColor:'yellow'}}>Male or Female</Text>
    </ModalStack>
  )
}

const navigationOptionsa = (navData: any,props: Props1) => {
    // console.log(navData)
    return {
        headerTitle: 'Customers',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu'
                    iconName='ios-menu'
                    onPress={()=>{navData.navigation.toggleDrawer()}}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='More'
                    iconName='ios-add'                      
                    onPress={()=> {navData.navigation.navigate('AddCustomerModal',{goBack:'CustomerList'})}}
                />
               
            </HeaderButtons>
        )
    }    
}
const config = (props: Props1) => {
  return {
    Customer: {
      screen: checkOut,
      navigationOptions: (navData: any) =>  navigationOptionsa(navData,{...props})
    }
 }
}
const props = {  
  actionMenu: () => {
    console.log('Helllo')
  }
}
const CheckOutNav1 = createStackNavigator(config({...props}))
const CustomerNav = createStackNavigator({
  CustomerList: {
    screen: CheckOutNav1
  },
  AddCustomerModal: {
    screen: categoryModal
  },
  AddressBookModal:{
    screen: addressBookModal
  },
  GenderSelectionModal: {
    screen: genderSelectionModal
    
  }
}, {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: {opacity: 1, backgroundColor:'transparent'},
  
  // transparentCard: true
})

export default CustomerNav
