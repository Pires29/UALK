import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../FireBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const PaginaAvaliacao = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { percurso } = route.params;  // Receba os parâmetros do percurso

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
                const username = authUser.displayName || authUser.email;  // Altere aqui para usar o displayName se estiver disponível
                await addDoc(collection(db, "comments"), {
                    userId: authUser.uid,
                    username: username,  // Use o displayName do usuário
                    comment: comentario,
                    percursoId: percurso.id,  // Associando o comentário ao percurso
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
                <View>
                    <Image
                        source={percurso.imagem}  // Use a imagem do percurso
                        style={styles.imagemTopo}
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.nomePercurso}>{percurso.nome}</Text>
                <Text style={styles.data}>{new Date().toLocaleDateString()}</Text>

                <Text style={styles.avaliacao}>Avaliação</Text>
                <Text style={styles.descricaoAvaliacao}>Adiciona a tua avaliação</Text>

                {percurso.avaliacaoEstrelas}

                <View style={styles.container2}>
                    <View style={styles.infoGroup}>
                        <Text style={styles.infoTitle}>Distância</Text>
                        <Text style={styles.infoValue}>{percurso.comprimento}</Text>
                    </View>
                    <View style={styles.infoGroup}>
                        <Text style={styles.infoTitle}>Tempo</Text>
                        <Text style={styles.infoValue}>{percurso.tempo}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.titulos}>A tua rota</Text>
                    <Image
                        source={require('../imagens/image 16.png')}
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
                    <TouchableOpacity style={styles.botaoSubmeter} onPress={handleCommentSubmit}>
                        <Text style={styles.textoBotao}>Submeter Comentário</Text>
                    </TouchableOpacity>

                    <Text style={styles.titulos}>Fotos</Text>
                    <Text style={styles.Texto}>Adiciona as tuas fotos do percurso</Text>
                    <View style={styles.exemplosImagens}>
                        <Image source={require('../imagens/image 5.png')} style={styles.imagemExemplo} />
                        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.imagemExemplo} />
                        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.imagemExemplo} />
                    </View>

                    <TouchableOpacity style={styles.botaoTerminar} onPress={() => navigation.navigate('NavBar')}>
                        <Text style={styles.textoBotao}>Terminar</Text>
                    </TouchableOpacity>
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
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 20,
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
    botaoSubmeter: {
        backgroundColor: '#62BB76',  // Alterado para um tom de verde para melhor contraste
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '70%',
        alignItems: "center",
        marginTop: 20,
    },
    botaoTerminar: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '70%',
        alignItems: "center",
        marginTop: 20,
    },
    textoBotao: {
        color: '#000',  // Texto do botão de terminar
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
    }
});

export default PaginaAvaliacao;
