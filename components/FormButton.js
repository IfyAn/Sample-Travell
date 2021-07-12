import React from 'react'
import { StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import {windowHeight, windowWidth} from '../utils/Dimensions'

const FormButton = ({buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

export default FormButton

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        width:'100%',
        height:windowHeight/15,
        backgroundColor:'#2e65e5',
        padding:10,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#ffff',
        //fontFamily:'Lato-Regular'
    }
})
  