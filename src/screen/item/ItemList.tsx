import React, {Component, useEffect, useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, ScrollView  } from 'react-native'
import { Text, ListItem, SearchBar, Image, CheckBox  } from 'react-native-elements'
// import {CustomerModel} from '../../models/Item'
import {NavProps} from '../../utils/NavProps'
import * as actions from '../../redux/actions/Item.act'

interface Props extends NavProps {}

const onItermPress=(props:Props,item: any)=>{
    //console.log('onItermPress', props)
    props.navigation.navigate('MyModal', {goBack: 'ItemList'})
}

const ItemList: React.FC<Props> = (props) => {    
  const list1 = useSelector((state: any) => { return state.item.filter}) 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({
      type: actions.FETCH_ITEMS
    })
  },[])

  const renderItem = (itemData: any) =>{ 
      // console.log('customer state:',itemData)  
      const {category={id:0, name:''}} = itemData.item
      return(           
          <ListItem
              key={itemData.index}
              leftAvatar={{ source: { uri: itemData.item.avatar_url } }}
              title={itemData.item.name +' - '+ category.name}                  
              subtitle={itemData.item.subtitle}
              topDivider = {false}
              onPress = {()=>onItermPress(props,itemData)}
              bottomDivider
          />                                  
      ) 
  }  
 
  const [search, setSearch] = useState('')  
  const updateSearch = (search: any) =>{
    setSearch(search)
    dispatch({
      type: actions.SEARCH_ITEM,
      payload: {search: search}
    })
    // console.log('from custom filter',filter)
  }  
  return(
      <View>
          <SearchBar
              placeholder="Type Here..."
              onChangeText={updateSearch}
              value={search}
              platform ={'ios'}
          /> 
          
          <FlatList
              scrollEnabled = {true}
              data = {list1}
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
export default ItemList