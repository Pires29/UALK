import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from './CarouselComponent';
import SearchBar from "./SearchBar";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../FireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const PercursoItem = () => {
    const carouselData = [
        require('../imagens/image 7.png'),
        require('../imagens/image 7.png'),
        require('../imagens/image 7.png')
    ];
    const navigation = useNavigation();

    const handleFavorite = async (percurso) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                favoritos: arrayUnion(percurso)
            });
        }
    };

    const percursos = [
        {
            id: 1,
            nome: 'Percurso 1',
            imagem: require('../imagens/image 5.png'),
            comprimento: '15Km',
            classificacao: '4.5',
            descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante'
        },
        {
            id: 2,
            nome: 'Percurso 2',
            imagem: require('../imagens/image 6.png'),
            comprimento: '15Km',
            classificacao: '4.5',
            descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.'
        },
        // Adicione mais percursos aqui...
    ];

    return (
        <View>
            <Slider data={carouselData} />
            <SearchBar/>
            {percursos.map(percurso => (
                <TouchableOpacity
                    key={percurso.id}
                    style={styles.container2}
                    onPress={() => navigation.navigate('PaginaAvaliacao')}
                >
                    <Image
                        source={percurso.imagem}
                        style={styles.imagem}
                    />
                    <View style={styles.detalhes}>
                        <Text style={styles.nome}>{percurso.nome}</Text>
                        <Text style={styles.comprimento}>{percurso.comprimento}</Text>
                        <Text style={styles.classificacao}>Classificação: {percurso.classificacao}</Text>
                        <Text style={styles.descricao}>{percurso.descricao}</Text>
                        <Icon
                            name="star-circle-outline"
                            size={30}
                            color="#7D8995"
                            style={styles.starIcon}
                            onPress={() => handleFavorite(percurso)}
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
        marginBottom: 5,
        color: 'white',
    },
    classificacao: {
        color: 'white',
        marginBottom: 5,
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

export default PercursoItem;
