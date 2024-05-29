import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NavPrincipal from '../components/NavPrincipal';
import PercursoItem from '../components/PercursoItem';
import AtividadesItem from '../components/Atividades';

const UalkScreen = () => {
    const [selectedOption, setSelectedOption] = useState('Percursos');

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
});

export default UalkScreen;