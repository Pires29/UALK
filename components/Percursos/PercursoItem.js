import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from '../CarouselComponent';
import SearchBar from "../SearchBar";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../FireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
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
                        <Text style={styles.avaliacaoQualitativa}>Classificação: {percurso.avaliacaoQuantitativa} </Text>
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
