import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import routes from '../navigations/routes';

const QRCodeScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');
    const [isScannerActive, setIsScannerActive] = useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setData(data);
        console.log(`Scanned QR Code Data: ${data}`);
        setIsScannerActive(false); // Automatically close the scanner after successful scan
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {isScannerActive && (
                <>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsScannerActive(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </>
            )}

            {!isScannerActive && (
                <View style={styles.scanResultContainer}>
                    <Text style={styles.scanResult}>You make the successful Delivery!</Text>
                    {scanned && (
                        <Button title="Delivered Successfully!" onPress={() => {
                            navigation.navigate(routes.HOME)
                        }} />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scanResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanResult: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    },
});

export default QRCodeScanner;
