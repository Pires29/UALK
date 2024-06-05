import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from '../CarouselComponent';
import SearchBar from "../SearchBar";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../FireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Percursos } from './Percursos';
import PopUp from "../PopUp";

const PercursoItem = () => {
    const [searchText, setSearchText] = useState('');
    const [showPopUp, setShowPopUp] = useState(true); // Definir como true para exibir automaticamente
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
            <View style={{paddingHorizontal: 20,}}>
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
                        <View style={styles.borderBottom} />
                    </TouchableOpacity>
                ))}
            </View>
            <PopUp
                visible={showPopUp}
                onClose={() => setShowPopUp(false)} // Fechar o PopUp
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#2C333C',
    },
    imagem: {
        width: 115,
        height: 115,
        borderRadius: 10,
        marginRight: 7,
    },
    detalhes: {
        flex: 1,
        marginLeft: 10,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 7,
        color: 'white',
    },
    avaliacaoQualitativa: {
        color: 'white',
    },
    comprimento: {
        color: 'white',
        fontSize: 12,
        marginBottom: 8,
    },
    descricao: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
    starIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    borderBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        width: '100%',
        backgroundColor: '#62BB76',
        alignSelf: 'center',

    },
});

export default PercursoItem;
