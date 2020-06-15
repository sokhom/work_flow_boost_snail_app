import React, {useState, useEffect, useCallback, } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import {StyleSheet, View, Alert, TouchableOpacity } from 'react-native'
import {Text, Input, Button } from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'
import { useForm, Controller  } from "react-hook-form";
import * as action from '../../redux/actions/Item.act'


interface Props extends NavProps {
    // goBack: () => void
} 

const ItemScreen: React.FC<Props> = (props) => {
    const { control, handleSubmit, errors,setValue  } = useForm();
    const dispatch = useDispatch();
   
    const [save,setSave] = useState({})

    const saveItemHandler = (data: any) => {
         dispatch({
            type: action.ADD_NEW_ITEM,
            payload: data
        })    
    }

    const onSubmit = (data: any) => {
        // const payload = JSON.stringify(data)
        const goBack = props.navigation.getParam('goBack') || 'ChechOut'    
        console.log('selectionItem goBack',goBack)
        const payload = {...data,category: item.category}
        dispatch({
            type: action.ADD_NEW_ITEM,
            payload: payload
        })
        props.navigation.navigate(goBack)
        // props.navigation.goBack()
    }
    
    const [item, setItem] = useState({
        itemName: 'Pro',
        description: '',
        color:'gray',
        category: {
            id: 1,
            name: 'Drink'
        }
    })
    // const [color, setColor] = useState('gray')
    
    const itemSelection = (categor: any) => {
        // console.log('itemSelection handler', item)
        setItem({
            ...item,           
            category:{id: categor.id, name: categor.name}
        })
        setValue([{
            'category': categor.name
        }])
    }

    const selectLabelColorHandler = (color: any) => {
        setItem({
            ...item,           
            color: color
        })
    }
    
    const toggleOverlay = () => {
        props.navigation.navigate('ItemAvatarModal',{categor:item.category
            ,selectLabelColorHandler: selectLabelColorHandler})        
    };
   
   
    return (
        <View style={styles.container} >
             <TouchableOpacity style={[styles.categoryLabel,{backgroundColor: item.color }]} onPress={toggleOverlay} 
                activeOpacity= {0.7}
            >
            </TouchableOpacity>
            <Controller
                as={<Input placeholder ='Item name' autoCapitalize="none" errorMessage= {errors.firstName && 'This is required'}/>}
                control={control}
                name="name"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                defaultValue={item.itemName}
            />
            <Controller
                as={<Input placeholder="Description" autoCapitalize="none"/>}
                control={control}
                name="description"
                onChange={args => args[0].nativeEvent.text}
                defaultValue={item.description}
            />
            <Controller
                as={
                    <Input value={item.category.name} placeholder="Category" autoCapitalize="none" 
                        onFocus = {() => props.navigation.navigate('SelectionModal',{categor:item.category
                        ,itemSelectionHandler: itemSelection})}
                    />
                }
                control={control}
                name="category"
                onChange={args => args[0].nativeEvent.text}
                defaultValue={item.category.name}
                onFocus = {() => {console.log('select from .....')} }
            />
            <Button
                title="Save" 
                containerStyle={{ marginTop: 0, flex: 1 }}
                // activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%', 
        alignItems: "center",
        padding: 10
    },
    categoryLabel: {
        minWidth: 80,
        minHeight: 80,
      backgroundColor: 'gray',
      justifyContent: "center",
      padding: 10,
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });

export default ItemScreen