import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RouteInfoAtividade = ({ time, difficulty, accessibility}) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoColumn}>
                <Text style={styles.infoValue}>{time}</Text>
                <Text style={styles.infoLabel}>Tempo</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.infoValue}>{difficulty}</Text>
                <Text style={styles.infoLabel}>Dificuldade</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.infoValue}>{accessibility}</Text>
                <Text style={styles.infoLabel}>Acessibilidade</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#3A3A3A',
        borderRadius: 8,
        marginVertical: 20,
        marginHorizontal: 15,
    },
    infoColumn: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    infoLabel: {
        fontSize: 14,
        color: 'white',
        marginTop: 10,
    },
});

export default RouteInfoAtividade;
