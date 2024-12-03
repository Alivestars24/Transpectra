import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import cartApi from '../apis/cartApi';
import color from '../config/color';
import ProductItem from '../components/ProductItem';
import { showToast } from '../components/ToastMessage';

const DeliveryHistoryScreen = () => {
    const products = useCartStore(state => state.products);
    const removeProduct = useCartStore(state => state.removeProduct);
    const clearCart = useCartStore(state => state.clearCart);
    const setProducts = useCartStore(state => state.setProducts);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);



    const handleCartProducts = async () => {
        setLoading(true);
        try {
            const result = await cartApi.GetCartProducts();
            setProducts(result.data.data.products);
            console.log("Fetched cart products", result.data.data.products);
            setLoading(false);
        } catch (error) {
            // showToast("error", `${error.response?.data}`);
            console.log("Failed to fetch product from server", error?.response?.data);
            setLoading(false);
        }
    };

    const removeAllProductFromCart = async () => {
        const originalProducts = [...products];
        await clearCart();
        try {
            const result = await cartApi.DeleteAllItemFromCart();
            // showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log("Failed to delete products from API", error);
            setProducts(originalProducts);
            // showToast("error", `${error.response.data.message}`);
        }
    };

    useEffect(() => {
        handleCartProducts();
    }, []);

    const handleRemoveProduct = async (cart_id) => {
        const originalProducts = [...products];
        removeProduct(cart_id);

        try {
            const result = await cartApi.DeleteProductFromCart(cart_id);
            // showToast("success", `${result.data.message}`);
        } catch (error) {
            // showToast("error", `${error.response.data.message}`);
            setProducts(originalProducts);
        }
    };

    const handleUpdateProduct = async (product) => {
        const originalProducts = [...products];
        removeProduct(product.id);

        try {
            await cartApi.UpdateProductCart(product);
        } catch (error) {
            console.log("Failed to update product in cart", error);
            setProducts(originalProducts);
            Alert.alert("Error", "Failed to update product. Please try again.");
        }
    };

    let displayedProducts = products;

    displayedProducts = [
        {
            "DistributionCenterId": "64e60fbcf589b2e4e09c27b8",
            "storeId": "64e60fbcf589b2e4e09c27b9",
            "pickupLocation": {
                "address": "krnool",
                "contactPerson": "John Doe",
                "contactNumber": "1234567890"
            },
            "dropoffLocation": {
                "address": "Vishakhapatnam",
                "contactPerson": "Jane Smith",
                "contactNumber": "0987654321"
            },
            "packageDetails": {
                "weight": "5kg",
                "dimensions": "30x30x30 cm",
                "fragile": true,
                "description": "Handle with care, contains glass items."
            },
            "status": "Pending",
            "assignedDriver": "64e60fbcf589b2e4e09c27ba",
            "estimatedDeliveryTime": "2024-08-20T10:00:00Z",
            "url": "",
        },
        {
            "DistributionCenterId": "64e60fbcf589b2e4e09c27c0",
            "storeId": "64e60fbcf589b2e4e09c27c1",
            "pickupLocation": {
                "address": "kurnool",
                "contactPerson": "Alice Johnson",
                "contactNumber": "9876543210"
            },
            "dropoffLocation": {
                "address": "Vijaywada",
                "contactPerson": "Bob Brown",
                "contactNumber": "0123456789"
            },
            "packageDetails": {
                "weight": "10kg",
                "dimensions": "50x50x50 cm",
                "fragile": false,
                "description": "Contains electronics, keep dry."
            },
            "status": "completed",
            "assignedDriver": "64e60fbcf589b2e4e09c27c2",
            "estimatedDeliveryTime": "2024-08-21T14:00:00Z",
            "url": ""
        },
        {
            "DistributionCenterId": "64e60fbcf589b2e4e09c27c3",
            "storeId": "64e60fbcf589b2e4e09c27c4",
            "pickupLocation": {
                "address": "kurnool",
                "contactPerson": "Charlie Davis",
                "contactNumber": "9876501234"
            },
            "dropoffLocation": {
                "address": "pune",
                "contactPerson": "Dana White",
                "contactNumber": "9876505678"
            },
            "packageDetails": {
                "weight": "3kg",
                "dimensions": "20x20x20 cm",
                "fragile": true,
                "description": "Fragile items, handle with care."
            },
            "status": "completed",
            "assignedDriver": "64e60fbcf589b2e4e09c27c5",
            "estimatedDeliveryTime": "2024-08-22T09:00:00Z",
            "url": ""
        }

    ]

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : displayedProducts.length === 0 ? (
                <Text style={styles.emptyCartText}>Your Delivery History is empty</Text>
            ) : (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>ITEMS ({displayedProducts.length})</Text>
                    </View>
                    <FlatList
                        data={displayedProducts}
                        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                        refreshing={refreshing}
                        onRefresh={handleCartProducts}
                        renderItem={({ item }) => (
                            <ProductItem
                                item={item}
                                navigation={navigation}
                                handleFirstButtonPress={handleRemoveProduct}
                                handleSecondButtonPress={handleUpdateProduct}
                                secondButtonText="View"
                            />
                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
    clearCartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyCartText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#777',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.medium,
    },
    productContainer: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productCategory: {
        fontSize: 14,
        color: '#777',
    },
    productType: {
        fontSize: 14,
        color: '#777',
    },
    removeButton: {
        flex: 1,
        padding: 5,
        backgroundColor: color.secondary,
        borderRadius: 3,
        marginHorizontal: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    wishlistButton: {
        flex: 1,
        backgroundColor: color.secondary,
        padding: 15,
        alignItems: 'center',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: color.primary,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default DeliveryHistoryScreen;
