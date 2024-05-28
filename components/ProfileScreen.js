import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AuthDetails from "./Autenticado";

export default function ProfileScreen() {

    return (
        <View style={{ flex: 1, backgroundColor: "#2C333C" }}>
            <View style={{ width: "100%", padding: 40 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                    <Image
                        source={require('../imagens/image 17.png')}
                        style={{ width: 120, height: 120 }}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'green', fontSize: 24 }}>Olá,</Text>
                        <AuthDetails />
                    </View>
                </View>
                <View style={styles.containerN}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.maintext}>Atividade</Text>
                        <Image
                            source={require('../imagens/icons/back-arrow.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={styles.innerContainer2}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>6</Text>
                            <Text style={styles.statLabel}>Concluídos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Favoritos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Eventos</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerN: {
        backgroundColor: "#7D8995",
        padding: 20,
        borderRadius: 3,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innerContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statNumber: {
        color: "white",
        fontSize: 22,
        marginBottom: 10,
    },
    statLabel: {
        color: "white",
        fontSize: 13,
    },
    maintext: {
        fontSize: 20,
        color: "white",
    },
});

