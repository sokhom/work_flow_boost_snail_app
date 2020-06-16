import React, {Component} from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'
import { BorderlessButton } from 'react-native-gesture-handler'

interface Props extends NavProps {

}

const TaskDetail: React.FC<Props> = (props) => {

    return (
        <View>
            <Text>My task detail information</Text>
        </View>
    )
}

export default TaskDetail