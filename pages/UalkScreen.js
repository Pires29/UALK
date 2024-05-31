import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import NavPrincipal from '../components/NavPrincipal';
import PercursoItem from '../components/PercursoItem';
import AtividadesItem from '../components/Atividades';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from "@react-navigation/native";

const UalkScreen = () => {
    const [selectedOption, setSelectedOption] = useState('Percursos');
    const navigation = useNavigation();
    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            <NavPrincipal onSelect={handleSelectOption} />
            <ScrollView style={styles.content}>
                {selectedOption === 'Percursos' ? (
                    <PercursoItem />
                ) : (
                    <AtividadesItem />
                )}
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Map')}>
                <Icon name="map-outline" size={40} color="#fffff" style={styles.mapaicone} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C333C',
        color: 'white',
    },
    content: {
        flex: 1,
    },
    floatingButton: {
        position: 'absolute',
        backgroundColor: '#62BB76',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 40,
        bottom: 20,
        right: 20,
        zIndex: 999,
        height: 60,
        width: 60,

    },
    mapaicone: {
        marginTop: 10, // Ajuste vertical para centralizar o ícone no círculo
         // Ajuste horizontal para centralizar o ícone no círculo
        textAlign: 'center',
        color: 'white',
    },
});

export default UalkScreen;
