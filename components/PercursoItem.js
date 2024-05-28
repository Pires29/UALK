import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from './CarouselComponent';
import SearchBar from "./SearchBar";
import { useNavigation } from '@react-navigation/native';


const PercursoItem = () => {
    const carouselData = [
        require('../imagens/image 7.png'),
        require('../imagens/image 7.png'),
        require('../imagens/image 7.png')
    ];
    const navigation = useNavigation();

    return (
        <View>
            <Slider data={carouselData} />
            <SearchBar/>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('PaginaAvaliacao')}>
            <Image
                source={ require('../imagens/image 5.png') }
                style={styles.imagem}
            />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Percurso 1</Text>
                    <Text style={styles.comprimento}>15Km</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma
                        música relaxante
                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('PaginaAvaliacao')}>
                <Image
                    source={ require('../imagens/image 6.png') }
                    style={styles.imagem}
                />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Percurso 2</Text>
                    <Text style={styles.comprimento}>15Km</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU,espaço  onde é contada a história da  federação.
                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('PaginaAvaliacao')}>
                <Image
                    source={ require('../imagens/image 7.png') }
                    style={styles.imagem}
                />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Percurso 3</Text>
                    <Text style={styles.comprimento}>15Km</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Bebe um chá(sem açúcar) e relaxa na esplanada
                        do bar.

                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('PaginaAvaliacao')}>
                <Image
                    source={ require('../imagens/image 11.png') }
                    style={styles.imagem}
                />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Percurso 2</Text>
                    <Text style={styles.comprimento}>15Km</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Este é um percurso agradável que se inicia na Casa do Estudante e
                        acaba na belíssima marinha da Casqueira.
                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />

                </View>
            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 3,
        backgroundColor: '#2C333C',
        borderBottomColor: '#62BB76',

    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
        borderBottomWidth: 3,
        backgroundColor: '#2C333C',
        borderBottomColor: '#62BB76',

    },

    imagem: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    detalhes: {
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    classificacao: {
        color: 'white',
        marginBottom: 5,
    },
    comprimento:{
        color: 'white',
        fontSize: 10,
        marginBottom: 2
    },
    descricao: {
        color: 'white',
    },
    starIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default PercursoItem;
