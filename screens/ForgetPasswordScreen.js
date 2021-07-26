import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,

  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState();

  const {forgetPassword} = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.text}>Reset Password Here</Text>
      <Text style={styles.navButtonText}>Email Address to Reset Your Password</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

     
      <FormButton
        buttonTitle="Reset Password"
        onPress={() => forgetPassword(email)}
      />
    
        <Text style={styles.navButtonText}>Check Your Registered Email Account</Text>
      
    </ScrollView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
    marginTop:10,
    marginBottom:10,
  },
});
