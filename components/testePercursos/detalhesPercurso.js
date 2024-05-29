import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalhesPercurso = ({ percurso }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: percurso.imagem }} style={styles.imagem} />
            <Text style={styles.titulo}>{percurso.titulo}</Text>
            <Text style={styles.texto}>Avaliação: {percurso.avaliacao}</Text>
            <Text style={styles.texto}>Tempo: {percurso.tempo}</Text>
            <Text style={styles.texto}>Dificuldade: {percurso.dificuldade}</Text>
            <Text style={styles.texto}>Acessibilidade: {percurso.acessibilidade}</Text>
            <Text style={styles.texto}>Descrição: {percurso.descricao}</Text>
            <Text style={styles.texto}>Pontos de Interesse: {percurso.pontosInteresse.join(', ')}</Text>
            <Image source={{ uri: percurso.mapa }} style={styles.mapa} />
            {/* Renderize mais detalhes conforme necessário, como comentários e fotos */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imagem: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
    },
    mapa: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
});

export default DetalhesPercurso;
