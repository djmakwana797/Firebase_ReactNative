import firestore from '@react-native-firebase/firestore'

const addproduct = (productName, price) => {
    if(!productName||!price) alert('Please enater all details')

    return firestore()
    .collection('products')
    .doc()
    .set({
        productName,
        price
    })
    .catch(err => console.log(err))
}

const getProduct = () => {
    return firestore()
    .collection('products')
    .get()
    .then (snap=>{
        const products = []
        snap.forEach(product =>products.push(product.data()))
        return products
    })
    .catch(err=> console.log(err))
}

export default Product = {
    addproduct,
    getProduct
}