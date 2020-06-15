import React, { useState } from 'react'
import {StyleSheet, View, FlatList, Text} from 'react-native'

import {Icon, Avatar, ListItem, Tile} from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'
import LabelColor from '../../components/LabelColor'

interface Props extends NavProps {

}

const CategoryLabel: React.FC<Props> = (props) => {  

    const itemSelectionHandler = props.navigation.getParam('itemSelectionHandler')
    return (
        <View style={styles.container}>
            <LabelColor {...props} onPressColor={itemSelectionHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        padding: 10
       
    }
  });
export default CategoryLabel