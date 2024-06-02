import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NavPrincipal from './NavPrincipal';

const SelecaoNavBar = () => {
    const [ setSelectedOption] = useState('');

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        // Faça algo com a opção selecionada, como navegar para uma tela diferente
    };

    return (
        <View style={styles.container}>
            <NavPrincipal onSelect={handleSelectOption} />
            {/* Renderizar outras partes da sua aplicação aqui */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
});

export default SelecaoNavBar;
