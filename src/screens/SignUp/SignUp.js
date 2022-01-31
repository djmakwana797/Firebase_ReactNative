import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError'

import { Auth } from '../../services';

const SignUp = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordReapeatError, setPasswordReapeatError] = useState('')

    const onRegisterPressed = () => {
        if(email=='') setEmailError('Email is required') 
        if(password=='') setPasswordError('Password is required')
        if(passwordRepeat=='') setPasswordReapeatError('Password confirmation required')
        if(email!="" && password!="" && passwordRepeat!=""){
            Auth.signUp(email,password)
            navigation.goBack()
        }
    }

    const onSignInPressed = () => {
        navigation.goBack()
    }

    const validateEmail = (email) =>{
        setEmail(email)
        const emailRegex = /\S+@\S+\.\S+/
        if(emailRegex.test(email)) setEmailError("")
        else setEmailError("Please enter valid email id")
    }
    const validatePassword = (pass) =>{
        setPassword(pass)
        if(pass.length < 6 ) setPasswordError("Password must be 6 character long")
        else setPasswordError("")
    } 
    const validadeRepeatPassword = (rpass) =>{
        setPasswordRepeat(rpass)
        if(rpass==password) setPasswordReapeatError("")
        else setPasswordReapeatError("Password did not match")
    } 

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Create an account</Text>

            <CustomInput placeholder="Email" value={email} setValue={(email)=>validateEmail(email)} label="Email"/>
            {emailError!=''? <CustomError message={emailError}/>:<></>}

            <CustomInput placeholder="Password" value={password} setValue={(pass)=>validatePassword(pass)} secureTextEntry={true} label="Password"/>
            {passwordError!=''? <CustomError message={passwordError}/>:<></>}

            <CustomInput placeholder="Repeat Password" value={passwordRepeat} setValue={(rpass)=>validadeRepeatPassword(rpass)} secureTextEntry={true} label="Repeat password"/>
            {passwordReapeatError!=''? <CustomError message={passwordReapeatError}/>:<></>}

            <CustomButton text="SIGN UP" onPress={onRegisterPressed}/>

            <CustomButton text="Have an account? Sign in" onPress={onSignInPressed} type="TERTIARY"/>
        </ScrollView>
        </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    title:{
        fontSize: 24,
        fontWeight:'bold',
        color: '#051c60',
        margin: 10,
        alignSelf: 'center'
    },
})

export default SignUp;
