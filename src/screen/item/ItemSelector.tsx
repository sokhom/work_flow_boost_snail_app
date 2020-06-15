import React, {Component, useState, useEffect, useLayoutEffect} from 'react'
import { View, StyleSheet, FlatList  } from 'react-native'
import { Text, ListItem, SearchBar, Image, CheckBox  } from 'react-native-elements'
import { connect, useDispatch, useSelector } from 'react-redux';
import {NavProps} from '../../utils/NavProps'
import * as action from '../../redux/actions/Item.act'
import {Category} from '../../models/Item.d'
interface Props extends NavProps {
    getItemSelection: ()=> {}
} 

interface State {}
const ItemSelector: React.FC<Props> = (props) =>{ 
    const [select,setSelect] = useState<Category[]>([])
    const dispatch = useDispatch()
    let list =  useSelector((state: any) => { return state.category.selection}) 
    const categor = props.navigation.getParam('categor') || {id:0, name: 'None'}
    const itemSelectionHandler = props.navigation.getParam('itemSelectionHandler')
    
    useEffect(() => {
        dispatch({
            type: action.CATEGORY_SELECTION           
        }) 
    },[])

    useEffect( () => {
        // setSelect(list)
        setSelect(list.map((d)=> {
            console.log(' selectionItem useEffect',d)       
            return {...d, isCheck: (d.name === categor.name || false)}
        }))    
      
    },[list])

    const onItermPress=(item: any)=>{
       
        setSelect(
            select.map((d)=> {
                return {...d, isCheck: (d.name === item.name || false)}
            })
        )
        props.navigation.setParams({selectionItem: item})
        itemSelectionHandler(item)
    }


    const renderItem = (itemData: any) =>{ 
        const isCheck = itemData.item.name === categor.name || false
        return(    
            <ListItem
                key={itemData.index}
                leftAvatar={{ source: { uri: itemData.item.avatar_url } }}
                title={itemData.item.name}
                // subtitle={itemData.item.subtitle}
                activeOpacity = {1}
                checkBox = {{size: 18, checked: itemData.item.isCheck, center: true, onPress: ()=> { onItermPress(itemData.item)} }}
                // checkBox = {()=>
                //     <CheckBox  
                //         checkedIcon='dot-circle-o'
                //         uncheckedIcon='circle-o' 
                //         checked={itemData.item.isCheck}
                //         onPress = {()=>onItermPress(itemData.item)}
                //     />
                // }
                subtitle={
                    <View style={styles.subtitleView}>                        
                    <Text style={styles.ratingText}>5 months ago</Text>
                    </View>
                }
                topDivider = {false}
                onPress = {()=>onItermPress(itemData.item)}
                bottomDivider
                // checkmark = {itemData.item.isCheck}
            />                                  
        )
    }
    
    const onPopupEvent = (eventName: string, index: number | undefined) => {
        console.log('from custom popup menu')        
    }

    return (
        <View>
            <SearchBar
                placeholder="Type Here..."
                // onChangeText={this.updateSearch}
                // value={search}
                platform ={'ios'}
            />                
            <FlatList
                data = {select}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(itemData) => {
                    // console.log('itemdata',itemData)
                    return renderItem(itemData)
                }}
                style={{ width: '100%' }}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
})


export default ItemSelector