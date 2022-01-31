import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import CustomError from '../../components/CustomError';

import { Auth } from '../../services';

const SignIn = ({navigation}) => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [emailError, setemailError] = useState('')
    const [passwordError, setpasswordError] = useState('')

    const onSignInPressed = () => {
        if(email=='') setemailError('Email is requierd')
        if(password == '') setpasswordError('Password is requierd')
        if(email!='' && password!=''){
            Auth.signIn(email,password)
        }
    }

    const validateemail = (email) =>{
        setemail(email)
        if(email.trim().length > 0 ) setemailError("")
        else setemailError("Email is required")
    }

    const validatePass = (pass) => {
        setpassword(pass)
        if(pass.length > 0 ) setpasswordError("")
        else setpasswordError("Password is required")
    }

    const onSignUpPressed = () =>{
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://4.bp.blogspot.com/-rtNRVM3aIvI/XJX_U07Z-II/AAAAAAAAJXY/YpdOo490FTgdKOxM4qDG-2-EzcNFAWkKACK4BGAYYCw/s1600/logo%2Bfirebase%2Bicon.png' }} style={styles.logo} />
            <CustomInput placeholder="email" setValue={(email) => validateemail(email)} label="Email" value={email} />
            {emailError == '' ? <></> : <CustomError message={emailError} />}
            <CustomInput placeholder="Password" value={password} setValue={(pass) => validatePass(pass)} secureTextEntry={true} label="Password" value={password} />
            {passwordError == '' ? <></> : <CustomError message={passwordError} />}
            <CustomButton text="SIGN IN" onPress={onSignInPressed} />
            <CustomButton text="Don't have an account? Create here" onPress={onSignUpPressed} type="TERTIARY" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        margin: 20
    }
})

export default SignIn;
