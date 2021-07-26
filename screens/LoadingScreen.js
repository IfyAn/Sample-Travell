
import React, {useEffect, useContext } from 'react'
import styled from 'styled-components'
import Text from '../components/Text'
import LottieView from "lottie-react-native";
import {UserContext } from '../context/UserContext'
import {FirebaseContext } from '../context/FirebaseContext'
import {AuthContext} from '../navigation/AuthProvider';

export default function LoadingScreen() {

   
      const [user, setUser] = useContext(AuthContext)
     
      useEffect(() => {
            setTimeout(async()=>{
                  const user=getCurrentUser()

                  if(user){

                        setUser({
                              isLoggedIn:true,
                              email:email,
                              uid:uid,
                              
                        })
                  } else {
                         setUser((state)=>({...state, isLoggedIn:false}))
                  }      
            }, 1500)
      }, [])

      return (
            <Container>
                  <Text title color='#f0f'>Sample Travell</Text>
                  <LottieView
                        loop
                        autoPlay
                        source={require("../assets/36093-world-tour.json")}
                        style={{width:'100%'}}
                  />
            </Container>
       );
};

const Container = styled.View`  
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color:#222222
`;