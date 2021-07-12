import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import FormButton from '../components/FormButton'

const MessagesScreen = () => {
    return (
        <View>
            <Text>This is MessagesScreen</Text>
            <FormButton buttonTitle='Click Here' />
        </View>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({})
