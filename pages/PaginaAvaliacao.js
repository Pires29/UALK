import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { auth, db } from "../FireBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import StarRating from "../components/Avaliação";
import Media from "../components/media";
import { useRoute } from '@react-navigation/native'; // Importe o hook useRoute

const PaginaAvaliacao = () => {

    const route = useRoute(); // Use o hook useRoute para acessar as props
    const { percurso, distance, duration } = route.params; // Acesse as props do objeto route.params
    
    const [authUser, setAuthUser] = useState(null);
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleCommentSubmit = async () => {
        if (!comentario.trim()) {
            Alert.alert("Erro", "O comentário não pode estar vazio");
            return;
        }

        if (authUser) {
            try {
                await addDoc(collection(db, "comments"), {
                    userId: authUser.uid,
                    username: authUser.displayName || authUser.email,
                    comment: comentario,
                    timestamp: new Date(),
                });
                Alert.alert("Sucesso", "Comentário adicionado com sucesso!");
                setComentario('');
            } catch (error) {
                console.error("Erro ao adicionar comentário: ", error);
                Alert.alert("Erro", "Não foi possível adicionar o comentário");
            }
        } else {
            Alert.alert("Erro", "Usuário não autenticado");
        }
    };

    return (
        <View style={styles.container3}>
            <ScrollView>
                <Image
                    source={require('../assets/images/porsol.jpeg')}
                    style={styles.imagemTopo}
                />
                <Text style={styles.nomePercurso}>Nome do Percurso</Text>
                <Text style={styles.data}>27 de março de 2024</Text>

                <Text style={styles.avaliacao}>Avaliação</Text>
                <Text style={styles.descricaoAvaliacao}>Adiciona a tua avaliação</Text>
                <Media />

                <View style={styles.container2}>
                    <View style={styles.infoGroup}>
                        <Text style={styles.infoTitle}>Comprimento</Text>
                        <Text style={styles.infoValue}>5 km</Text>
                    </View>
                    <View style={styles.infoGroup}>
                        <Text style={styles.infoTitle}>Tempo</Text>
                        <Text style={styles.infoValue}>2 horas</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.titulos}>A tua rota</Text>
                    <Image
                        source={require('../assets/images/mapa.jpeg')}
                        style={styles.imagemPercurso}
                    />

                    <Text style={styles.titulos}>Comentários</Text>
                    <Text style={styles.Texto}>Adiciona aqui o teu comentário</Text>

                    <TextInput
                        placeholder="Comentário..."
                        placeholderTextColor="#9F9F9F"
                        style={styles.comentarioInput}
                        multiline
                        value={comentario}
                        onChangeText={setComentario}
                    />
                    <TouchableOpacity style={styles.botaoTerminar} onPress={handleCommentSubmit}>
                        <Text style={styles.textoBotao}>Submeter Comentário</Text>
                    </TouchableOpacity>

                    <Text style={styles.titulos}>Fotos</Text>
                    <Text style={styles.Texto}>Adiciona as tuas fotos do percurso</Text>
                    <View style={styles.exemplosImagens}>
                        <Image source={require('../assets/images/menina.jpeg')} style={styles.imagemExemplo} />
                        <Image source={require('../assets/images/menina.jpeg')} style={styles.imagemExemplo} />
                        <Image source={require('../assets/images/menina.jpeg')} style={styles.imagemExemplo} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container3: {
        flex: 1,
        backgroundColor: '#2C333C',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    container2: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        backgroundColor: '#2C333C',
        borderBottomColor: '#9F9F9F',
        borderTopColor: '#9F9F9F',
        width: '90%',
        alignSelf: 'center',
    },
    imagemTopo: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    nomePercurso: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
    },
    avaliacao: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    descricaoAvaliacao: {
        color: 'white',
        fontSize: 10,
        marginBottom: 10,
        marginLeft: 20,
    },
    data: {
        color: '#979797',
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 10,
    },
    infoGroup: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '70%',
    },
    infoTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    infoValue: {
        color: 'white',
    },
    imagemPercurso: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    comentarioInput: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9F9F9F',
        backgroundColor: '#2C333C',
        color: 'white',
        marginBottom: 10,
        padding: 10,
    },
    exemplosImagens: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    imagemExemplo: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    botaoTerminar: {
        backgroundColor: '#62BB76',  // Alterado para um tom de verde para melhor contraste
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '70%',
        alignItems: "center",
        marginTop: 20,
    },
    textoBotao: {
        color: 'white',  // Alterado para branco para melhor visibilidade
        fontWeight: 'bold',
        fontSize: 18,
    },
    Texto: {
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: 10,
        fontSize: 10,
    },
    titulos: {
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default PaginaAvaliacao;


