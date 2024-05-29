import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';





export default function Mapa() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
