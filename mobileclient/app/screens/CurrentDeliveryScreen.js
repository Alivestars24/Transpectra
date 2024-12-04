import React, { } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import color from '../config/color';
import AppSlider from '../components/AppSlider';
import _ from 'lodash';
import AppTable from '../components/AppTable';
import AppButton from '../components/AppButton';
import { Button } from 'react-native-paper';
import routes from '../navigations/routes';

const CurrentDeliveryScreen = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
            >
                <>
                    <AppSlider images={[{
                        image_url: require('../assets/map.png')
                    }]} />

                    <View style={styles.productCodeContainer}>
                        <Text style={styles.productCode}>kurnool- Vishakhapatnam </Text>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <AppButton title={"Scan QR Code"} style={styles.Button} color={"blue"} onPress={() => navigation.navigate("QRCode")} />
                    </View>


                    <AppTable
                        title="Delivery Items"
                        data={[
                            {
                                'coco cola': "200",
                                "Water Bottle(Plastic)": "180",
                                "Tiffin Boxes(Medium)": "85",
                                'Chips Packet(Large)': "50",
                                'Juice Box(200ml)': "120",
                                'Biscuits Pack(Family)': "90",
                                'Chocolate Bar': "45",
                                'Instant Noodles(1 pack)': "30",
                                'Ice Cream Tub(Small)': "150",
                                'Soda Can(330ml)': "60",
                                'Bread Loaf(Whole Wheat)': "40",
                                'Butter(100g)': "70",
                                'Milk Carton(1L)': "55",
                                'Eggs(Dozen)': "75",
                                'Apple Juice(1L)': "130",
                            }
                        ]}
                    />

                </>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
    productCodeContainer: {
        margin: 10,
        backgroundColor: color.light,
    },
    ButtonContainer: {
        margin: 10,
    },
    productCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.medium,
        margin: 10,
        textAlign: "center",
    },
    Button: {
        flex: 1,
        backgroundColor: color.blue,
        padding: 20,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});

export default CurrentDeliveryScreen;
