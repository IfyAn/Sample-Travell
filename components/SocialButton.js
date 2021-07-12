import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import {windowHeight, windowWidth} from '../utils/Dimensions'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const SocialButton = ({buttonTitle, btnType, color, backgroundColor, ...rest}) => {
    let bgColor= backgroundColor;
    return (
        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor:bgColor}]} {...rest}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonContainer, {color:color}]}>{buttonTitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SocialButton

const styles = StyleSheet.create({
    btnTxtWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonContainer:{
        marginTop:10,
        width:'100%',
        height:windowHeight/15,
        padding:10,
        borderRadius:3,
        flexDirection:'row',
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        //fontFamily:'Lato-Regular'
    },
    icon:{
        fontWeight:'bold'
    },
     iconWrapper:{
        width:30,
        alignItems:'center',
        justifyContent:'center',
    },
})
  