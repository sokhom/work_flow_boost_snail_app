import React, {useState, useEffect, useCallback, } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import {StyleSheet, View, Alert, TouchableOpacity } from 'react-native'
import {Text, Input, Button } from 'react-native-elements'
import {NavProps} from '../../utils/NavProps'
import { useForm, Controller  } from "react-hook-form";
import * as action from '../../redux/actions/Item.act'
import AddressBook, {Contact} from '../../components/AddressBook'


interface Props extends NavProps {
    // goBack: () => void
} 

const AddCustomer: React.FC<Props> = (props) => {
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
        const goBack = props.navigation.getParam('goBack') || 'CustomerList'    
        // console.log('selectionItem goBack',goBack)
        const payload = {...data}
        dispatch({
            type: action.ADD_NEW_ITEM,
            payload: payload
        })
        props.navigation.navigate(goBack)
        // props.navigation.goBack()
    }
    
    const [customer, setCustomer] = useState({
        firstName: 'Customer',
        lastName: '1',
        phone:'',
        email:'',
        sex: 'Male'
    })
    // const [color, setColor] = useState('gray')
    
    const genderSelection = (sex: string) => {
        // console.log('itemSelection handler', item)
        setCustomer({
            ...customer,           
            sex: sex
        })
       
    }

    const contactSelection = (contact: Contact) => {
        setCustomer({
            ...customer,
            firstName: (contact.firstName || ''),
            lastName: (contact.lastName || '')
        })
        const values = Object.entries(contact).map(([k,v])=> ({[k]: v}))
        setValue(values)
        console.log('------------------------- select contact1',values)
    }
    
   
   
    return (
        <View style={styles.container} >    
            <AddressBook {...props} contactSelection= {contactSelection}/>      
            <Controller
                as={<Input value={customer.firstName} placeholder ='First name' autoCapitalize="none" errorMessage= {errors.firstName && 'This is required'}/>}
                control={control}
                name="firstName"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                defaultValue={customer.firstName}
            />
            <Controller
                as={<Input value={customer.lastName} placeholder="Last name" autoCapitalize="none"/>}
                control={control}
                name="lastName"
                onChange={args => args[0].nativeEvent.text}
                defaultValue={customer.lastName}
            />
            <Controller
                as={
                    <Input value={customer.sex} placeholder="Select gender" autoCapitalize="none" 
                        onFocus = {() => props.navigation.navigate('GenderSelectionModal',{sex: customer.sex
                        ,genderSelectionHandler: genderSelection})}
                    />
                }
                control={control}
                name="sex"
                onChange={args => args[0].nativeEvent.text}
                defaultValue={customer.sex}
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

export default AddCustomer