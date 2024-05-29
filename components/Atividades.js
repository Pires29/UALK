import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Slider from './CarouselComponent';
import SearchBar from "./SearchBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const AtividadesItem = () => {
    const carouselData = [
        { uri: '../imagens/image 4.png' },
        require('../imagens/image 6.png'),
        { uri: 'https://via.placeholder.com/150' }
    ];
    return (
        <View>
            <Slider data={carouselData} />
            <SearchBar/>
            <View style={styles.container}>
                <Image
                    source={ require('../imagens/image 5.png') }
                    style={styles.imagem}
                />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Sessão de Yoga</Text>
                    <Text style={styles.participantes}>20 pessoas vão participar</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Aproveita a calma das marinhas para ver o pôr do sol e relaxar numa sessão de grupo de yoga
                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />

                </View>
            </View>
            <View style={styles.container}>
                <Image
                    source={ require('../imagens/image 6.png') }
                    style={styles.imagem}
                />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Concerto - Rapazes de Verde</Text>
                    <Text style={styles.participantes}>12 pessoas vão participar</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Este é um percurso agradável que se inicia na Casa do Estudante e
                        acaba na belíssima marinha da Casqueira.
                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />

                </View>
            </View>
            <View style={styles.container}>
                <Image
                    source={ require('../imagens/image 7.png') }
                    style={styles.imagem}
                />
                <View style={styles.detalhes}>
                    <Text style={styles.nome}>Atividade 3</Text>
                    <Text style={styles.participantes}>12 pessoas vão participar</Text>
                    <Text style={styles.classificacao}>Classificação: 4.5</Text>
                    <Text style={styles.descricao}>
                        Este é um percurso agradável que se inicia na Casa do Estudante e
                        acaba na belíssima marinha da Casqueira.
                    </Text>
                    <Icon name="star-circle-outline" size={30} color="#7D8995" style={styles.starIcon} />

                </View>
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
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
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    classificacao: {
        color: 'white',
        marginBottom: 5,
    },
    participantes:{
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

export default AtividadesItem;
