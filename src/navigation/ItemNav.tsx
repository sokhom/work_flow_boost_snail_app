import React ,{useState} from 'react'
import { View, StyleSheet ,Modal, Button,} from 'react-native'
// import { Text, Icon, Header} from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
// import { Header as HeaderItem} from 'react-native/Libraries/NewAppScreen'
import HeaderButton from '../components/HeaderButton'
import Items  from '../screen/item'
import {NavProps} from '../utils/NavProps'
import ItemList from '../screen/item/ItemList'
import CategoryList from '../screen/item/CategoryList'
import  ModalStack,{ModalStackProps} from '../components/ModalStack'
import CategoryScreen from '../screen/item/CategoryScreen'
import CategoryLabel from '../screen/item/CategeryLabel'
import ItemAvatar from '../screen/item/ItemAvatar'

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation'
import ItemScreen from '../screen/item/ItemScreen'
import ItemSelector from '../screen/item/ItemSelector'



interface Props1 {
  actionMenu?: () => void
} 
interface Props extends NavProps { 
  // goBack: () => void
} 

const ItemCate: React.FC<Props> = (props) => {
  return (
    <View>
      <Items {...props}>       
      </Items>      
    </View>
  )
}

const myModal: React.FC<ModalStackProps> = (props) => {  
  return (
    <ModalStack {...props} header='Create New Item'>          
      <ItemScreen {...props}/>
    </ModalStack>
  )
}

interface SelectOrProps extends ModalStackProps {
  getItemSelection: () => {}
}
const selectionModal: React.FC<SelectOrProps> = (props) => {  
  return (
    <ModalStack {...props} header='Select Category' leftIcon='angle-left'>          
       <ItemSelector {...props}/>
    </ModalStack>    
  )
}

const categoryModal: React.FC<ModalStackProps> = (props) => {  
  return (
    <ModalStack {...props} header='Create New Category'>          
      <CategoryScreen {...props}/>
    </ModalStack>
  )
}
const selectCatLabelModal: React.FC<SelectOrProps> = (props) => {  
  return (
    <ModalStack {...props} header='Select Category Label' leftIcon='angle-left'>          
       <CategoryLabel {...props}/>
    </ModalStack>    
  )
}

const itemAvatarModal: React.FC<SelectOrProps> = (props) => {  
  return (
    <ModalStack {...props} header='Select Item Avatar' leftIcon='angle-left'>          
       <ItemAvatar {...props}/>
    </ModalStack>    
  )
}

const allItemsNavOpt = (navData: any) => {
    // console.log(navData)
    return {
      headerTitle: 'Items',
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
              title='Menu'
              iconName='ios-menu'
              onPress={()=>{navData.navigation.toggleDrawer()}}
            />
        </HeaderButtons>
      )
    //   headerRight: (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //         <Item 
    //             title='More'
    //             iconName='ios-more'                    
    //             onPress={()=> {navData.navigation.navigate('MyModal',{goBack:'ItemList'})}}
    //         />               
    //     </HeaderButtons>
    //   )
    }    
}

const itemListNavOption = (navData: any) => {
  
  return {
      headerTitle: 'Item List',    
      headerRight: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item 
                  title='More'
                  iconName='ios-add'                    
                  onPress={ ()=> {navData.navigation.navigate('MyModal',{goBack:'ItemList'})} }
              /> 
          </HeaderButtons>
      )
  }    
}

const categoriesNavOption = (navData: any) => {
  
  return {
      headerTitle: 'Categories',    
      headerRight: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item 
                  title='More'
                  iconName='ios-add'                    
                  onPress={ ()=> {navData.navigation.navigate('CategoryModal',{goBack:'Categories'})} }
              /> 
          </HeaderButtons>
      )
  }    
}

const config = () => {
  return {
    Items: {
      screen: ItemCate,
      navigationOptions: (navData: any) =>  allItemsNavOpt(navData)
    },
    ItemList:{
      screen: ItemList,
      navigationOptions:(navData: any) => itemListNavOption(navData)
    },
    Categories:{
      screen: CategoryList,
      navigationOptions:(navData: any) => categoriesNavOption(navData)
    }
 }
}

const ItemStack = createStackNavigator(config())

const ItemNav = createStackNavigator({
  ItemNav: {
    screen: ItemStack
  },
  MyModal: {
    screen: myModal
  },
  SelectionModal: {
    screen: selectionModal
  },
  ItemAvatarModal: {
    screen: itemAvatarModal
  },
  CategoryModal: {
    screen: categoryModal
  },
  SelectCatLabelModal: {
    screen: selectCatLabelModal
  }
}, {
  mode: 'modal',
  headerMode: 'none',
  cardOverlayEnabled: false
})

export default ItemNav
