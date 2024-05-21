import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonRow = ({ handleButtonPress }) => {
    return (
        <View style={styles.percursosContainer}>
            <TouchableOpacity
                style={styles.buttonWithImagePercurso}
                onPress={() => handleButtonPress('Percurso1')}
            >
                <Image
                    source={require('../assets/images/porsol.jpeg')}
                    style={styles.buttonImagePercurso}
                    resizeMode="cover" // Ajuste a imagem para cobrir todo o botão
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonWithImagePercurso}
                onPress={() => handleButtonPress('Percurso2')}
            >
                <Image
                    source={require('../assets/images/porsol.jpeg')}
                    style={styles.buttonImagePercurso}
                    resizeMode="cover" // Ajuste a imagem para cobrir todo o botão
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonWithImagePercurso}
                onPress={() => handleButtonPress('Percurso3')}
            >
                <Image
                    source={require('../assets/images/porsol.jpeg')}
                    style={styles.buttonImagePercurso}
                    resizeMode="cover" // Ajuste a imagem para cobrir todo o botão
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonWithImagePercurso}
                onPress={() => handleButtonPress('Percurso4')}
            >
                <Image
                    source={require('../assets/images/porsol.jpeg')}
                    style={styles.buttonImagePercurso}
                    resizeMode="cover" // Ajuste a imagem para cobrir todo o botão
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    percursosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Permite que os itens quebrem para a próxima linha, se necessário
        paddingHorizontal: 10,
    },
    buttonWithImagePercurso: {
        width: '22%', // Ajuste a largura conforme necessário
        aspectRatio: 0.9, // Ajuste a proporção altura/largura para que a imagem seja mais alta do que larga
        marginVertical: 10,
        marginBottom: 30,
    },
    buttonImagePercurso: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});

export default ButtonRow;
