import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Header } from 'react-native/Libraries/NewAppScreen'
import HeaderButton from '../components/HeaderButton'

interface Props {}

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen!!</Text>
    </View>
  );
};

HomeScreen.navigationOptions = (navData: any) => {
    return {
        headerTitle: 'Home heade title',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu'
                    iconName='ios-menu'
                    onPress={()=>{navData.navigation.toggleDrawer()}}
                />
            </HeaderButtons>
        )
    }    
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
