import React, { useState } from "react";
import { View, TextInput, Pressable, Switch, Text, StyleSheet } from "react-native";
import { setProducts } from "../../firebase/products";
import {router} from 'expo-router';
const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        max: "",
        isAvailable: false,
        images: [],
        id: "",
        discountPrice: "",
    });

    const handleAddProduct = async () => {
        console.log("name",product);
        try {
            await setProducts(product);
            router.push("/(products)/");
        } catch (error) {
            console.log("Error adding product:", error);
        }
        setProduct({
            name: "",
            price: "",
            max: "",
            isAvailable: false,
            images: [],
            id: "",
            discountPrice: "",
        });
    };

    const handleChange = (key, value) => {
        setProduct(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={product.name}
                onChangeText={text => handleChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={product.price}
                onChangeText={text => handleChange('price', text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Max"
                value={product.max}
                onChangeText={text => handleChange('max', text)}
                keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Is Available:</Text>
                <Switch
                    value={product.isAvailable}
                    onValueChange={value => handleChange('isAvailable', value)}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Images (You can enter the URLs separated by comma)"
                value={product.images.join(",")}
                onChangeText={text => handleChange('images', text.split(","))}
            />
            <TextInput
                style={styles.input}
                placeholder="ID"
                value={product.id}
                onChangeText={text => handleChange('id', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Discount Price"
                value={product.discountPrice}
                onChangeText={text => handleChange('discountPrice', text)}
                keyboardType="numeric"
            />
            <Pressable
                onPress={handleAddProduct}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                ]}
            >
                <Text style={styles.buttonText}>Add Product</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFE366',
        height: '100%',
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 16,
    },
    switchLabel: {
        marginRight: 10,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        color: 'white',
        fontSize: 23,
    },
});

export default AddProduct;
