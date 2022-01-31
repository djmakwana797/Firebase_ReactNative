import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const createUserInDB = (email) => {
    return firestore().collection('users').doc(uid).set({
        uid,
        email
    })
}

const signUp = (email, password) => {
    return (
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .then(cred=>{
                const {uid} = cred.user
                return uid
            })
            .then( uid => createUserInDB(uid, email))
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            })
    )
}

const signIn = (email,pass) => {
    return (
        auth().signInWithEmailAndPassword(email,pass)
        .then(()=>{})
        .catch(
            error => console.log(error)
        )
    )
}

const signOut = () => {
    return auth().signOut()
}

const Auth = {
    signIn,
    signUp,
    signOut
} 

export default Auth