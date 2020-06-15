import React from 'react'
import { 
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation'
import {Text} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import HeaderButton from '../components/HeaderButton'
import HomeScreen from '../screen/HomeScreen'
import Setting from '../screen/Setting'
import Colors from '../constants/Colors'
import CustomerNav from '../navigation/CustomerNav'
import CheckOutNav from '../navigation/CheckOutNav'
import ItemNav from '../navigation/ItemNav'

// import RNPopoverMenu from 'react-native-popover-menu'
import {MenuProvider, Menu, MenuOption, MenuTrigger, MenuOptions} from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons'



const homeNavigation = createStackNavigator({        
    Home: {screen: HomeScreen }
})
const settingNavigation = createStackNavigator({        
    Setting: {screen: Setting }
})

const tabScreenConfig = {
    Home: {
        screen: homeNavigation,
        navigationOption:{
            tabBarLabel: <Text>Home</Text>
        }
    },
    Setting: {
        screen: settingNavigation,
        navigationOption:{
            tabBarLabel: <Text>Setting</Text>
        }
    }
}

const HomeTabNavigation = createBottomTabNavigator(
    tabScreenConfig,
    {
        tabBarOptions: {
            activeTintColor: Colors.accentColor 
        }
    }
)

const MainNavigation = createDrawerNavigator({
    CheckOut: {
        screen: CheckOutNav,
        navigationOptions: {
            drawerLabel: 'CheckOut',
        }
    },
    Customer: {
        screen: CustomerNav,
        navigationOptions: {
            drawerLabel: 'Customers'
        }
    },
    Items: {
        screen: ItemNav,
        navigationOptions: {
            drawerLabel: 'Items'
        }
    },
    Home: {
        screen: HomeTabNavigation,
        navigationOptions: {
            drawerLabel: 'Setting'
        }
    }
})

export default createAppContainer(MainNavigation)