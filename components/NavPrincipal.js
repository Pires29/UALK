import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NavPrincipal = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('Percursos');

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../imagens/LogoN.png')}
                style={styles.logo}
            />
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[styles.option, selectedOption === 'Percursos' && styles.selected]}
                    onPress={() => handleSelect('Percursos')}
                >
                    <Text style={[styles.optionText, selectedOption === 'Percursos' && styles.selectedText]}>Percursos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selectedOption === 'Atividades' && styles.selected]}
                    onPress={() => handleSelect('Atividades')}
                >
                    <Text style={[styles.optionText, selectedOption === 'Atividades' && styles.selectedText]}>Atividades</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', // Alterado para column
        backgroundColor: '#2C333C',
        borderRadius: 0,
        overflow: 'hidden',
        alignItems: "center",
        marginBottom: 20
    },
    logo: {
        width: 200, // Defina a largura conforme necessário
        height: 40, // Defina a altura conforme necessário
        marginTop: 50,
    },
    optionsContainer: {
        flexDirection: 'row', // Layout de linha para as opções
        paddingHorizontal: 20,
    },
    option: {
        flex: 1, // Faz a opção ocupar o espaço disponível
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 2.3,
        borderBottomColor: '#C9C9C9',

    },
    selected: {
        borderBottomColor: '#62BB76',
    },
    optionText: {
        color: '#C9C9C9',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedText: {
        color: '#62BB76', // Cor do texto quando selecionado
    },
});

export default NavPrincipal;
