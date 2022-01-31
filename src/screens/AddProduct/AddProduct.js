import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Product } from '../../services';
import Navigation from '../../components/Navigation';

const AddProduct = ({navigation}) => {

    const [pname, setpname] = useState("");
    const [pprice, setpprice] = useState("");

    const save = () => {
        Product.addproduct(pname,pprice)
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
      <CustomInput label="Product Name" placeholder="Enter product name" value={pname} setValue={setpname}/>
      <CustomInput label="Price" placeholder="Enter product price" value={pprice} setValue={setpprice}/>
      <CustomButton text='Save' onPress={save}/>
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
