import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../FireBase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { markers } from '../components/Map/markers';
import PaginaAvaliacao from "../components/PaginaAvaliacao";
import RouteInfoAtividade from "../components/RouteInfoCaractAtividade";



const DescriptionAtividades = ({ navigation, route }) => {
    const { atividade } = route.params;

    const [selectedButton, setSelectedButton] = useState(1);
    const [comments, setComments] = useState([]);

    const handleButtonPress = () => {
        navigation.navigate('Description', {percursoId});
    }

    const handlePress = (percurso) => {
        navigation.navigate('Description', { percurso });
    };

    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, 'comments'), where('atividadeId', '==', atividade.id));
            const querySnapshot = await getDocs(q);
            const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(commentsData);
        };

        fetchComments();
    }, [atividade.id]);

    const handleButtonPress2 = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    return (
        <View style={styles.container}>
            <View style={styles.background} />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={atividade.imagem}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.field}>
                    <Text style={styles.title}>Atividade {atividade.nome}</Text>
                    <TouchableOpacity
                        style={styles.buttonWithImage}
                        onPress={handleButtonPress}
                    >
                        <Image
                            source={require('../components/Atividade/imagensAtividades/estrela.png')}
                            style={styles.favoritos}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>

                <RouteInfoAtividade time={atividade.tempo} difficulty={atividade.dificuldade} accessibility={atividade.acessibilidade} />

                <View style={styles.descricao}>
                    <Text style={styles.subtitle}> Descrição </Text>
                    <Text style={styles.text}>{atividade.descricao}</Text>
                </View>

                <View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Percursos </Text>
                </View>

                <View style={styles.percursoscontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Description', { percurso: atividade.percursoAssociado})} style={styles.buttonpercurso}>
                        <Image source={atividade.percursoAssociado.imagem} style={styles.imagePercurso} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Description', {percurso: atividade.percursoAssociado2})} style={styles.buttonpercurso}>
                        <Image source={atividade.percursoAssociado2.imagem} style={styles.imagePercurso} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Description', { percurso: atividade.percursoAssociado3 })} style={styles.buttonpercurso}>
                        <Image source={atividade.percursoAssociado3.imagem} style={styles.imagePercurso} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PaginaAvaliacao',{ atividade: atividade })}
                    style={styles.buttonText}
                >
                    <Text style={styles.fontes}>Let's UALK</ Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#2C333C',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 250,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    avaliacao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
    },
    descricao: {
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    smallImage: {
        width: 75,
        height: 75,
        marginRight: 10,
        borderRadius: 10,
        marginLeft: 25,
    },
    smallImageEstrelinhas: {
        width: 120,
        height: 20,
        marginRight: 10,
        borderRadius: 10,
    },
    smallImage2: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginLeft: 20,
    },
    favoritos: {
        width: 70,
        height: 70,
    },
    text: {
        fontSize: 14,
        color: 'white',
        marginLeft: 25,
        textAlign: 'justify',
        width: '87%',
    },
    text2: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        width: '40%',
        marginLeft: 9,
    },
    text3: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        width: '75%',
        marginLeft: 9,
    },
    textComentarios: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        width: '87%',
        marginLeft: 25,
        marginTop: 8,
        marginBottom: 8,
    },
    textavaliacao: {
        fontSize: 16,
        color: 'white',
    },
    title: {
        width: '75%',
        fontSize: 24,
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    subtitle: {
        width: '80%',
        fontSize: 18,
        color: 'white',
        marginTop: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    subtitle2: {
        width: '80%',
        fontSize: 18,
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    subsubtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    separator: {
        width: '93%',
        height: 4,
        backgroundColor: '#62BB76',
        marginVertical: 10,
        alignSelf: 'center',
    },
    button1: {
        width: '40%',
        padding: 12,
        borderRadius: 5,
        marginTop: 35,
        marginVertical: 10,
        marginLeft: 25,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#62BB76',
        backgroundColor: 'transparent',
    },
    button2: {
        width: '44%',
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 9,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 35,
    },
    buttonText: {
        width: '44%',
        backgroundColor: '#62BB76',
        padding: 13,
        borderRadius: 9,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 35,
        fontWeight: 'bold',
    },
    fontes:{
        fontWeight: 'bold'
    },
    buttonText1botao: {
        fontSize: 14,
        color: '#62BB76',
        fontWeight: 'bold',
    },
    scrollViewContent: {
        paddingBottom: 40,
    },
    pontosinteresse: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    buttonWithImage: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        alignSelf: "center",
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderBottomWidth: 4,
        borderColor: 'white',
    },
    selectedButton: {
        borderBottomWidth: 4,
        borderColor: '#62BB76',
    },
    buttonText2: {
        fontSize: 16,
        color: 'white',
    },
    content: {
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10,
        borderRadius: 5,
    },

    percursoscontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },

    buttonpercurso: {
        width: '30%', // Aproximadamente um terço do container
        aspectRatio: 1, // Para manter as imagens quadradas
        margin: 5,
    },
    imagePercurso: {
        width: '100%',
        height: '110%',
        resizeMode: 'cover',
        borderRadius: 20,
    },



});

export default DescriptionAtividades;
