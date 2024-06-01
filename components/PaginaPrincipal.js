import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NavPrincipal from './NavPrincipal';
import PercursoItem from './Percursos/PercursoItem';
import AtividadesItem from './Atividade/Atividades';
import NavBar from "./NavBar";

const PaginaPrincipal = () => {
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
            <NavBar/>

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

export default PaginaPrincipal;
