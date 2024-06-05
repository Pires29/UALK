import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import RouteInfo from '../components/RouteInfoCaractPercurso';
import { db } from '../FireBase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { markers } from '../components/Map/markers';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from "react-native-vector-icons/FontAwesome";

const Description = ({ navigation, route }) => {
    const { percurso } = route.params;
    const [selectedMarker, setSelectedMarker] = useState([]);
    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const [selectedButton, setSelectedButton] = useState(1);

    useEffect(() => {
        setSelectedMarker([markers[3], markers[4]]);
    }, []);

    useEffect(() => {
        const fetchCommentsAndRatings = async () => {
            try {
                const commentsQuery = query(collection(db, 'comments'), where('percursoId', '==', percurso.id));
                const commentsSnapshot = await getDocs(commentsQuery);
                const commentsData = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const usersQuery = query(collection(db, 'users'));
                const usersSnapshot = await getDocs(usersQuery);
                const usersData = usersSnapshot.docs.map(doc => doc.data());

                const ratingField = `avaliacao${percurso.id}`;

                const commentsWithRatings = commentsData.map(comment => {
                    const userRating = usersData.find(user => user[ratingField]);
                    const averageRating = userRating ? userRating[ratingField] : 0;
                    return { ...comment, rating: averageRating };
                });

                setComments(commentsWithRatings);
            } catch (error) {
                console.error("Error fetching comments and ratings: ", error);
            }
        };

        fetchCommentsAndRatings();
    }, [percurso.id]);

    const handleButtonPress2 = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    const handleShowAllComments = () => {
        setShowAllComments(true);
    };

    const handleShowLessComments = () => {
        setShowAllComments(false);
    };

    const renderComment = ({ item }) => (
        <View>
            <View style={styles.pontosinteresseComment}>
            <Ionicons
                            name="user-circle-o"
                            size={50}
                            color="#ffffff"
                            padding={0}
                        />
                <View style={styles.textContainerComment}>
                    <Text style={styles.subsubtitleComent}>{item.username}</Text>
                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                                key={star}
                                name={star <= item.rating ? 'star' : 'star-outline'}
                                size={20}
                                color="white"
                            />
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.textContainerComment2}>
                <Text style={styles.textComentarios}>{item.comment}</Text>
            </View>
            <View style={styles.separator} />
        </View>
    );

    const commentsToShow = showAllComments ? comments : comments.slice(0, 3);

    return (
        <View style={styles.container}>
            <View style={styles.background} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={percurso.imagem}
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
                    <Text style={styles.title}>Percurso {percurso.nome}</Text>
                    <Image
                        source={percurso.passos}
                        style={styles.smallpassos}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.avaliacao}>
                    <Image
                        source={require('../assets/images/estrela.png')}
                        style={styles.smallImage2}
                        resizeMode="cover"
                    />
                    <Text style={styles.textavaliacao}> {percurso.avaliacaoNumero} </Text>
                </View>
                <RouteInfo time={percurso.tempo} difficulty={percurso.dificuldade} accessibility={percurso.acessibilidade} distance={percurso.comprimento} />
                <View style={styles.descricao}>
                    <Text style={styles.subtitle}> Descrição </Text>
                    <Text style={styles.text}>{percurso.descricao}</Text>
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Pontos de Interesse </ Text>
                </View>
                <View style={styles.pontosinteresse}>
                    <Image
                        source={percurso.pontoInteresse1}
                        style={styles.smallImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.subsubtitle}> {percurso.nome} </ Text>
                        <Text style={styles.text2}>{percurso.descricao} </ Text>
                    </View>
                </View>
                <View style={styles.pontosinteresse}>
                    <Image
                        source={percurso.pontoInteresse2}
                        style={styles.smallImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.subsubtitle}> {percurso.tituloPonto} </ Text>
                        <Text style={styles.text3}>{percurso.textoPonto} </ Text>
                    </View>
                </View>
                {/*<View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Mapa </ Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonWithImage}
                    onPress={() => navigation.navigate('colocarapagina')}
                >
                    <Image
                        source={require('../assets/images/mapa.jpeg')}
                        style={styles.buttonImage}
                        resizeMode="contain"
                    />
    </TouchableOpacity>*/}
                    <View style={{justifyContent: "center", alignItems: "center", marginTop: 20,}}>
                        <Text style={styles.buttonText2}>Comentários</ Text>
                    </View>
                <View style={[styles.bar, { marginLeft: selectedButton === 1 ? 0 : '50%' }]} />
                {selectedButton === 1 ? (
                    <View style={styles.content}>
                        <FlatList
                            data={commentsToShow}
                            keyExtractor={(item) => item.id}
                            renderItem={renderComment}
                        />
                        {comments.length > 3 && (
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={showAllComments ? handleShowLessComments : handleShowAllComments}
                            >
                                <Text style={styles.buttonText1botao}>{showAllComments ? 'Ver Menos' : 'Ver Todos'}</ Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <View style={styles.content}>
                        <Text>Conteúdo do botão 2</ Text>
                    </View>
                )}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Map', { percurso: percurso })}
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
    image: {
        width: '100%',
        height: 250,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#2C333C', // ou outra cor de fundo desejada
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20, 
        paddingHorizontal: 20,
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
        paddingHorizontal: 15,
    },
    smallImage: {
        width: 75,
        height: 75,
        marginRight: 10,
        borderRadius: 10,
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
    },
    smallpassos: {
        width: 70,
        height: 70,
        marginRight: 30,
    },
    text: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        width: '87%',
        marginLeft: 5,
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
        width: '70%',
        marginLeft: 9,
    },
    textComentarios: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        width: '87%',
        marginTop: 8,
        marginLeft: 20,
    },
    textavaliacao: {
        fontSize: 16,
        color: 'white',
    },
    title: {
        width: '75%',
        fontSize: 24,
        color: 'white',
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
    },
    subtitle2: {
        width: '80%',
        fontSize: 18,
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
    },
    subsubtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subsubtitleComent:{
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    separator: {
        width: '91%',
        height: 3,
        backgroundColor: '#62BB76',
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginVertical: 20,
    },
    button1: {
        width: '40%',
        padding: 12,
        borderRadius: 5,
        marginTop: 35,
        marginVertical: 10,
        marginLeft: 14,
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
        backgroundColor: "#62BB76",
        paddingVertical: 15,
        width: 200,
        borderRadius: 15,
        marginTop: 40,
        alignItems: "center",
        alignSelf: "center",
    },
    fontes: {
        fontWeight: 'bold',
        color:"white",
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
        paddingHorizontal: 20,
    },
    pontosinteresseComment:{
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    textContainerComment: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 15,
    },
    textContainerComment2: {
        marginTop: 5,
    },
    buttonWithImage: {
        width: 320,
        height: 122,
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
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        borderRadius: 5,
    },
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        marginHorizontal: 5,
    },
});

export default Description;
