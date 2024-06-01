import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from '../CarouselComponent';
import SearchBar from "../SearchBar";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../FireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";


const AtividadeItem = () => {
    const carouselData = [
        require('../../imagens/image 7.png'),
        require('../../imagens/image 7.png'),
        require('../../imagens/image 7.png')
    ];
    const navigation = useNavigation();

    const handleFavorite = async (atividade) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                favoritos: arrayUnion(atividade)
            });
        }
    };

    const atividades = [
        {
            id: 1,
            nome: 'Sessão de Yoga',
            imagem: require('../../assets/images/porsol.jpeg'),
            comprimento: '1,7 Km',
            descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
            tempo: '21 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/porsol.jpeg'),
        },
        {
            id: 2,
            nome: 'Concerto - Rapazes de Verde',
            imagem: require('../../assets/images/porsol.jpeg'),
            comprimento: '1 Km',
            descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
            tempo: '14 min',
            dificuldade: 'Difícil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/porsol.jpeg'),
        },

        {
            id: 3,
            nome: 'Atividade 3',
            imagem: require('../../assets/images/porsol.jpeg'),
            comprimento: '1,4 Km',
            descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
            tempo: '19 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/porsol.jpeg'),

        },

        {
            id: 4,
            nome: 'Atividade 4',
            imagem: require('../../assets/images/porsol.jpeg'),
            comprimento: '1,3 Km',
            descricao: 'Conhece o espaço do Programa de Voluntariado da UA e vê como podes participar nas várias atividades.',
            tempo: '19 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/porsol.jpeg'),
        },


    ];

    return (
        <View>
            <Slider data={carouselData} />
            <SearchBar/>
            {atividades.map(atividade => (
                <TouchableOpacity
                    key={atividade.id}
                    style={styles.container2}
                    onPress={() => navigation.navigate('DescriptionAtividade', {atividade: atividade })}
                >
                    <Image
                        source={atividade.imagem}
                        style={styles.imagem}
                    />
                    <View style={styles.detalhes}>
                        <Text style={styles.nome}>{atividade.nome}</Text>
                        <Text style={styles.descricao}>{atividade.descricao}</Text>
                        <Icon
                            name="star-circle-outline"
                            size={30}
                            color="#7D8995"
                            style={styles.starIcon}
                            onPress={() => handleFavorite(atividade)}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 15,
        color: 'white',
    },
    avaliacaoQualitativa: {
        color: 'white',
        marginBottom: 5,
        fontSize: 14,
    },
    comprimento: {
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

export default AtividadeItem;
