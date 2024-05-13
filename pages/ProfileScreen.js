import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Favorites from './Favorites';

export default function ProfileScreen() {

    const navigation = useNavigation();

    const goToOtherComponent = () => {
        navigation.navigate('Favorites');
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#2C333C"}}>
            <TouchableOpacity onPress={goToOtherComponent}>
            <View style={{width: "100%", padding: 40,}}>
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
                    <Image
                    source={require('../assets/images/image 16.png')} // Substitua './caminho/para/sua/imagem.jpg' pelo caminho relativo da sua imagem
                    style={{ width: 100, height: 100 }} // Ajuste a largura e altura conforme necessário
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ color: 'green', fontSize: 24, }}>Olá,</Text>
                        <Text style={{color: "white", fontSize: 24}}>Marta Dias</Text>
                    </View>
                </View>
                <View style={styles.containerN}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.maintext}>Atividade</Text>
                        <Image
                            source={require('../assets/icons/back-arrow.png')} // Substitua './caminho/para/sua/imagem.jpg' pelo caminho relativo da sua imagem
                            style={{ width: 20, height: 20 }} // Ajuste a largura e altura conforme necessário
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
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    item: {
        alignItems: 'center',
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
    }
});