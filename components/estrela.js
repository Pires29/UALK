import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const Star = ({ selected, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image
            style={styles.star}
            source={selected ? require('../assets/images/estrelinhacheia.png') : require('../assets/images/estrelinhavazia.png')}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    star: {
        width: 70,
        height: 70,
    },
});

export default Star;
