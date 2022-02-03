import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Auth } from '../../services';
import { Product } from '../../services';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation }) => {

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      Product.getProduct()
        .then(prod =>
          setproducts(prod),
          setloading(false),
          console.log(products)
        )
        .catch(err => console.log(err))
    }
  }, [isFocused]);


  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="#cddccd" size={'large'} />}
      <ScrollView
        style={{ flex: 1 }}
      >
        {
          products && products.map((data, index) => (
            <View
              key={index}
              style={styles.products}
            >

              <Image source={{ uri: data.image }} style={{ height: 100, width: 100, margin: 8 }} />
                <Text style={styles.productxt}>{data.productName}</Text>
                <Text style={styles.productxt}>{data.price}</Text>
            </View>
          ))
        }

      </ScrollView>
      <CustomButton text="ADD PRODUCT" onPress={() => { navigation.navigate('Add Product') }} />
      <CustomButton text="SIGN OUT" onPress={() => Auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  products: {
    justifyContent: 'space-around',
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  productxt: {
    fontSize: 20,
    color: 'orange',
    marginHorizontal : 30,
    alignSelf: 'center'
  }
})

export default Home;
