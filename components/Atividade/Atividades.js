import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from '../CarouselComponent';
import SearchBar from "../SearchBar";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../FireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import RatingScreen from "../componentsAvaliacao/percurso1/media";
import AverageRating from "../componentsAvaliacao/percurso1/mediaTotal";
import RatingScreen2 from "../componentsAvaliacao/percurso2/media2";
import AverageRating2 from "../componentsAvaliacao/percurso2/mediatotal2";
import RatingScreen3 from "../componentsAvaliacao/percurso3/media3";
import AverageRating3 from "../componentsAvaliacao/percurso3/mediaTotal3";

const AtividadeItem = () => {
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
    const handleFavorite = async (atividade) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const validatedItem = validateItem({ ...atividade, type: 'atividade' });
            try {
                await updateDoc(userRef, {
                    favoritos: arrayUnion(validatedItem)
                });
                console.log("Atividade adicionada aos favoritos com sucesso");
            } catch (error) {
                console.error("Erro ao adicionar atividade aos favoritos: ", error);
            }
        }
    };



    const atividades = [
        {
            id: 1,
            nome: 'Sessão de Yoga',
            imagem: require('./imagensAtividades/yoga.jpeg'),
            descricao: 'Os yogis espalhados pelo mundo ainda se questionam como é que o yoga não tem ainda mais praticantes.',
            tempo: '1 hora',
            dificuldade: 'Intermédio',
            acessibilidade: 'Normal',
            percursoAssociado: {
                id: 1,
                nome: 'Marinha da Casqueira',
                imagem: require('../../assets/images/porsol.jpeg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosMarinha.png'),
                comprimento: '1,7 Km',
                descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
                tempo: '21 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen/>,
                avaliacaoQuantitativa: <AverageRating/>,
            },
            percursoAssociado2: {
                id: 2,
                nome: 'FADU',
                imagem: require('../Percursos/imagesPercursos/fadu.jpg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosCasaEst1.png'),
                comprimento: '1 Km',
                descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
                tempo: '14 min',
                dificuldade: 'Difícil',
                acessibilidade: 'Normal',
                mapa: require('../../assets/images/mapa.jpeg'),
                avaliacaoEstrelas: <RatingScreen2/>,
                avaliacaoQuantitativa: <AverageRating2/>,

            },
            percursoAssociado3: {
                id: 3,
                imagem: require('../Percursos/imagesPercursos/BarPretoImage.png'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosBarPreto.png'),
                nome: 'Bar Preto',
                comprimento: '1,4 Km',
                descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
                tempo: '19 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen3/>,
                avaliacaoQuantitativa: <AverageRating3/>,
            },
        },
        {
            id: 2,
            nome: 'Jogar setas',
            imagem: require('./imagensAtividades/setas.jpg'),
            descricao: 'Passa pelo CUA e joga umas setas com os teus amigos',
            tempo: '20 min',
            dificuldade: 'fácil',
            acessibilidade: 'Normal',
            percursoAssociado: {
                id: 1,
                nome: 'Marinha da Casqueira',
                imagem: require('../../assets/images/porsol.jpeg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosMarinha.png'),
                comprimento: '1,7 Km',
                descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
                tempo: '21 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen/>,
                avaliacaoQuantitativa: <AverageRating/>,
            },
            percursoAssociado2: {
                id: 2,
                nome: 'FADU',
                imagem: require('../Percursos/imagesPercursos/fadu.jpg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosCasaEst1.png'),
                comprimento: '1 Km',
                descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
                tempo: '14 min',
                dificuldade: 'Difícil',
                acessibilidade: 'Normal',
                mapa: require('../../assets/images/mapa.jpeg'),
                avaliacaoEstrelas: <RatingScreen2/>,
                avaliacaoQuantitativa: <AverageRating2/>,

            },
            percursoAssociado3: {
                id: 3,
                imagem: require('../Percursos/imagesPercursos/BarPretoImage.png'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosBarPreto.png'),
                nome: 'Bar Preto',
                comprimento: '1,4 Km',
                descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
                tempo: '19 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen3/>,
                avaliacaoQuantitativa: <AverageRating3/>,
            },
        },

        {
            id: 3,
            nome: 'Berber chá',
            imagem: require('./imagensAtividades/cha.jpg'),
            descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
            tempo: '15 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            percursoAssociado: {
                id: 1,
                nome: 'Marinha da Casqueira',
                imagem: require('../../assets/images/porsol.jpeg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosMarinha.png'),
                comprimento: '1,7 Km',
                descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
                tempo: '21 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen/>,
                avaliacaoQuantitativa: <AverageRating/>,
            },
            percursoAssociado2: {
                id: 2,
                nome: 'FADU',
                imagem: require('../Percursos/imagesPercursos/fadu.jpg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosCasaEst1.png'),
                comprimento: '1 Km',
                descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
                tempo: '14 min',
                dificuldade: 'Difícil',
                acessibilidade: 'Normal',
                mapa: require('../../assets/images/mapa.jpeg'),
                avaliacaoEstrelas: <RatingScreen2/>,
                avaliacaoQuantitativa: <AverageRating2/>,

            },
            percursoAssociado3: {
                id: 3,
                imagem: require('../Percursos/imagesPercursos/BarPretoImage.png'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosBarPreto.png'),
                nome: 'Bar Preto',
                comprimento: '1,4 Km',
                descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
                tempo: '19 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen3/>,
                avaliacaoQuantitativa: <AverageRating3/>,
            },
        },

        {
            id: 4,
            nome: 'Caminhada em Grupo',
            imagem: require('./imagensAtividades/caminhada.jpg'),
            descricao: 'Não estejas sozinh@ nas tuas caminhadas. Diz quais percursos queres participar e junta-te a um novo grupo.',
            tempo: '30 min',
            dificuldade: 'Fácil',
            acessibilidade: 'Normal',
            percursoAssociado: {
                id: 1,
                nome: 'Marinha da Casqueira',
                imagem: require('../../assets/images/porsol.jpeg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosMarinha.png'),
                comprimento: '1,7 Km',
                descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
                tempo: '21 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen/>,
                avaliacaoQuantitativa: <AverageRating/>,
            },
            percursoAssociado2: {
                id: 2,
                nome: 'FADU',
                imagem: require('../Percursos/imagesPercursos/fadu.jpg'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosCasaEst1.png'),
                comprimento: '1 Km',
                descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
                tempo: '14 min',
                dificuldade: 'Difícil',
                acessibilidade: 'Normal',
                mapa: require('../../assets/images/mapa.jpeg'),
                avaliacaoEstrelas: <RatingScreen2/>,
                avaliacaoQuantitativa: <AverageRating2/>,

            },
            percursoAssociado3: {
                id: 3,
                imagem: require('../Percursos/imagesPercursos/BarPretoImage.png'),
                passos: require('../Percursos/imagesPercursos/imagesPassos/passosBarPreto.png'),
                nome: 'Bar Preto',
                comprimento: '1,4 Km',
                descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
                tempo: '19 min',
                dificuldade: 'Fácil',
                acessibilidade: 'Normal',
                avaliacaoEstrelas: <RatingScreen3/>,
                avaliacaoQuantitativa: <AverageRating3/>,
            },
        },


    ];
    const filteredAtividades = atividades.filter(atividade =>
        atividade.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View>
            <Slider data={carouselData} />
            <SearchBar onSearch={setSearchText} />
            {filteredAtividades.map(atividade => (
                <TouchableOpacity
                    key={atividade.id}
                    style={styles.container2}
                    onPress={() => navigation.navigate('DescriptionAtividade', { atividade: atividade })}
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
