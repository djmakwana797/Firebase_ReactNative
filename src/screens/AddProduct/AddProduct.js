import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Product } from '../../services';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'

const AddProduct = ({ navigation }) => {

    const [pname, setpname] = useState("");
    const [pprice, setpprice] = useState("");
    const [image, setimage] = useState("");

    const openCamera = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {
            const filepath = fileobj.assets[0].uri
            const uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(filepath)
            
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) { alert("uploaded") }
                },
                (error) => {
                    console.log("Error: ",error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setimage(downloadURL)
                    });
                }
            );
        })
    }

    const save = () => {
        Product.addproduct(pname, pprice, image)
            .then(
                ToastAndroid.show('Product added', ToastAndroid.LONG)
            ).then(
                navigation.goBack()
            )
            .catch(
                err => console.log(err)
            )
    }
    return (
        <View style={styles.container}>
            <CustomInput label="Product Name" placeholder="Enter product name" value={pname} setValue={setpname} />
            <CustomInput label="Price" placeholder="Enter product price" value={pprice} setValue={setpprice} />
            <CustomButton text="Upload image" onPress={() => openCamera()} />
            <CustomButton text='Save' onPress={() => save()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20
    }
})

export default AddProduct;
