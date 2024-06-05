import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import RouteInfo from '../components/RouteInfoCaractPercurso';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../FireBase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { markers } from '../components/Map/markers';

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
            <View style={styles.pontosinteresse}>
                <Image
                    source={require('../imagens/icons/Profile.png')}
                    style={styles.smallImage}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.subsubtitle}>{item.username}</Text>
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
            <View style={styles.textContainer}>
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
                    <Text style={styles.textavaliacao}> {percurso.avaliacaoQuantitativa} </Text>
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
                <View style={styles.descricao}>
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
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 1 && styles.selectedButton]}
                        onPress={() => handleButtonPress2(1)}
                    >
                        <Text style={styles.buttonText2}>COMENTÁRIOS</ Text>
                    </TouchableOpacity>
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
    fontes: {
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
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
    },
    star: {
        marginHorizontal: 5,
    },
});

export default Description;
