import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../FireBase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FavoriteList = () => {
    const navigation = useNavigation();
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setFavoritos(userDoc.data().favoritos || []);
                }
            }
        };

        fetchFavorites();
    }, []);

    const removeFromFavorites = async (percursoId) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const updatedFavoritos = userDoc.data().favoritos.filter(percurso => percurso.id !== percursoId);
                await updateDoc(userRef, { favoritos: updatedFavoritos });
                setFavoritos(updatedFavoritos);
            }
        }
    };

    const navigateToDescription = (item) => {
        const routeName = item.type === 'atividade' ? 'DescriptionAtividade' : 'Description';
        navigation.navigate(routeName, { percurso: item });
    };

    return (
        <View style={styles.container}>
            {favoritos.length > 0 ? (
                favoritos.map((item, index) => (
                    <TouchableOpacity
                        key={`${item.id}-${item.type}`} // Combinação de id e type para garantir unicidade
                        style={styles.container2}
                        onPress={() => navigateToDescription(item)}
                    >
                        <Image
                            source={item.imagem}
                            style={styles.imagem}
                        />
                        <View style={styles.detalhes}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.comprimento}>{item.comprimento}</Text>
                            <Text style={styles.classificacao}>Classificação: {item.classificacao}</Text>
                            <Text style={styles.descricao}>{item.descricao}</Text>
                            <Icon
                                name="star-circle-outline"
                                size={30}
                                color="#7D8995"
                                style={styles.starIcon}
                                onPress={() => removeFromFavorites(item.id)}
                            />
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>Nenhum favorito encontrado</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2C333C',
        padding: 10,
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

export default FavoriteList;
