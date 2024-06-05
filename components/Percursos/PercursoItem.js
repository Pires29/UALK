import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from '../CarouselComponent';
import SearchBar from "../SearchBar";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../FireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import RatingScreen from "../componentsAvaliacao/percurso1/media";
import RatingScreen2 from "../componentsAvaliacao/percurso2/media2";
import RatingScreen3 from "../componentsAvaliacao/percurso3/media3";
import RatingScreen4 from "../componentsAvaliacao/percurso4/media4";
import AverageRating from "../componentsAvaliacao/percurso1/mediaTotal";
import AverageRating2 from "../componentsAvaliacao/percurso2/mediatotal2";
import AverageRating3 from "../componentsAvaliacao/percurso3/mediaTotal3";
import AverageRating4 from "../componentsAvaliacao/percurso4/mediaTotal4";
import { Percursos } from './Percursos';

const PercursoItem = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const carouselData = [
        require('../../imagens/image 7.png'),
        require('../../imagens/image 7.png'),
        require('../../imagens/image 7.png')
    ];
    const validateItem = (item) => {
        return {
            id: item.id || '',
            nome: item.nome || '',
            imagem: item.imagem || '',
            comprimento: item.comprimento || '',
            descricao: item.descricao || '',
            type: item.type || ''
        };
    };
    const handleFavorite = async (percurso) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const validatedItem = validateItem({ ...percurso, type: 'percurso' });
            try {
                await updateDoc(userRef, {
                    favoritos: arrayUnion(validatedItem)
                });
                console.log("Percurso adicionado aos favoritos com sucesso");
            } catch (error) {
                console.error("Erro ao adicionar percurso aos favoritos: ", error);
            }
        }
    };


 /*)   const percursos = [
        {
            id: 1,
            nome: 'Marinha da Casqueira',
            imagem: require('../../assets/images/porsol.jpeg'),
            passos: require('./imagesPercursos/imagesPassos/passosMarinha.png'),
            comprimento: '1,7 Km',
            descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
            tempo: '21 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/mapa.jpeg'),
            avaliacaoEstrelas: <RatingScreen />,
            avaliacaoQuantitativa: <AverageRating />,
            coordenadas: {
                pontoA: {
                    latitude: 40.6405,
                    longitude: -8.6538,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                pontoB: {
                    latitude: 40.6455,
                    longitude: -8.6588,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
            },
        },
        {
            id: 2,
            nome: 'FADU',
            imagem: require('./imagesPercursos/fadu.jpg'),
            passos: require('./imagesPercursos/imagesPassos/passosCasaEst1.png'),
            comprimento: '1 Km',
            descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
            tempo: '14 min',
            dificuldade: 'Difícil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/mapa.jpeg'),
            avaliacaoEstrelas: <RatingScreen2 />,
            avaliacaoQuantitativa: <AverageRating2 />,
            coordenadas: {
                pontoA: {
                    latitude: 40.6405,
                    longitude: -8.6488,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                pontoB: {
                    latitude: 40.6455,
                    longitude: -8.6538,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
            },
        },
        {
            id: 3,
            nome: 'Bar Preto',
            imagem: require('./imagesPercursos/BarPretoImage.png'),
            comprimento: '1,4 Km',
            descricao: 'Bebe um chá (sem açucar) e relaxa na esplanada',
            tempo: '19 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/mapa.jpeg'),
            avaliacaoEstrelas: <RatingScreen3 />,
            avaliacaoQuantitativa: <AverageRating3 />,
            coordenadas: {
                pontoA: {
                    latitude: 40.6455,
                    longitude: -8.6538,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                pontoB: {
                    latitude: 40.6505,
                    longitude: -8.6588,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
            },
        },
        {
            id: 4,
            nome: 'Loja Vol',
            imagem: require('./imagesPercursos/lojaVol.png'),
            passos: require('./imagesPercursos/imagesPassos/passosLojaVol1.png'),
            comprimento: '1,3 Km',
            descricao: 'Conhece o espaço do Programa de Voluntariado da UA e vê como podes participar nas várias atividades.',
            tempo: '19 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            mapa: require('../../assets/images/mapa.jpeg'),
            avaliacaoEstrelas: <RatingScreen4 />,
            avaliacaoQuantitativa: <AverageRating4 />,
            coordenadas: {
                pontoA: {
                    latitude: 40.6405,
                    longitude: -8.6588,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                pontoB: {
                    latitude: 40.6455,
                    longitude: -8.6638,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
            },
        },
    ];*/
    

    const filteredPercursos = Percursos.filter(percurso =>
        percurso.nome.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <View>
            <Slider data={carouselData} />
            <SearchBar onSearch={setSearchText} />
            {filteredPercursos.map(percurso => (
                <TouchableOpacity
                    key={percurso.id}
                    style={styles.container2}
                    onPress={() => navigation.navigate('Description', { percurso: percurso })}
                >
                    <Image
                        source={percurso.imagem}
                        style={styles.imagem}
                    />
                    <View style={styles.detalhes}>
                        <Text style={styles.nome}>{percurso.nome}</Text>
                        <Text style={styles.comprimento}>{percurso.comprimento}</Text>
                        <Text style={styles.avaliacaoQualitativa}>{percurso.avaliacaoQuantitativa} </Text>
                        <Text style={styles.descricao}>{percurso.descricao}</Text>
                        <Icon
                            name="star-circle-outline"
                            size={30}
                            margin = {-7}
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

export default PercursoItem;
