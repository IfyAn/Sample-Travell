import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const Skip=({...props})=>{
    <Button title='Skip' color='#0000' {...props} />
}
const Next=({...props})=>{
    <Button title='Next' color='#0000' {...props} />
}
const Done=({...props})=>{
    <TouchableOpacity style={{marginHorizontal:10}} {...props}>
      <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity> 
}
const Dots=({selected})=>{
    let backgroundColor;
    backgroundColor= selected ? 'rgba(0, 0, 0, 0.8)' : '(0, 0, 0, 0.3)'
    return( <View style={{width:7, height:7, marginHorizontal: 4, backgroundColor}} /> )
}

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            // SkipButtonComponent={Skip}
            // NextButtonComponent={Next}
            // DoneButtonComponent={Done}
            // DotComponent={Dots}
            onSkip={()=>navigation.replace('Login')}
            onDone={()=>navigation.navigate('Login')}
            pages={[
                {
                backgroundColor: '#00008b',
                image: <Image source={require('../assets/africa-travel.jpg')} />,
                title: 'My connection',
                subtitle: 'The world is a globbal village',
                },
                {
                backgroundColor: '#006400',
                 image: <Image source={require('../assets/travel-world.jpg')} />,
                title: 'Communication is very Vital',
                subtitle: 'easy communication for you and me',
                },
                {
                backgroundColor: '#8b008b',
                image: <Image source={require('../assets/world-map.jpg')} resizeMode='contain' />,
                title: 'Onboarding3',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                
            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
