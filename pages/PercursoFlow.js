import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import RouteInfo from '../components/RouteInfoCaractPercurso';  // Importe o novo componente
import ButtonRow from '../components/ButtonRowPercursos'

const PercursoFlowConst = ({ navigation }) => {

    const handleButtonPress = () => {
        navigation.navigate('colocarapagina');
    }

    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonPress2 = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    const handleButtonPress3 = (page) => {
        navigation.navigate(page);
    };

    return (
        <View style={styles.container}>
            <View style={styles.background} />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image
                    source={require('../assets/images/porsol.jpeg')}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.field}>
                    <Text style={styles.title}>Beber um chá</Text>
                    <Image
                        source={require('../assets/images/estrelaAtividade.png')}
                        style={styles.smallestrelaAtividade}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.avaliacao}>
                    <Image
                        source={require('../assets/images/estrela.png')}
                        style={styles.smallImage2}
                        resizeMode="cover"
                    />
                    <Text style={styles.textavaliacao}> 4.7 (49) </Text>
                </View>

                {/* Informações do trajeto */}
                <RouteInfo time="25 min" difficulty="Fácil" accessibility="Normal" />

                <View style={styles.descricao}>
                    <Text style={styles.subtitle}> Descrição </Text>
                    <Text style={styles.text}>Este é um percurso agradável que se inicia na Casa do Estudante e acaba na belíssima marinha da Casqueira.
                        Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro, enquanto ouves uma música relaxante.  </Text>
                </View>

                <View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Mapa </Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonWithImage}
                    onPress={handleButtonPress}
                >
                    <Image
                        source={require('../assets/images/mapa.jpeg')}
                        style={styles.buttonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Seleção de percursos associados à atividade */}

                <View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Percursos </Text>
                </View>

                <ButtonRow handleButtonPress={handleButtonPress3} />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 1 && styles.selectedButton]}
                        onPress={() => handleButtonPress2(1)}
                    >
                        <Text style={styles.buttonText2}>COMENTÁRIOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, selectedButton === 2 && styles.selectedButton]}
                        onPress={() => handleButtonPress2(2)}
                    >
                        <Text style={styles.buttonText2}>FOTOS</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.bar, { marginLeft: selectedButton === 1 ? 0 : '50%' }]} />

                {selectedButton === 1 ? (
                    <View style={styles.content}>
                        <View style={styles.pontosinteresse}>
                            <Image
                                source={require('../assets/images/menina.jpeg')}
                                style={styles.smallImage}
                                resizeMode="contain"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.subsubtitle}> Marta Dias </Text>
                                <Image
                                    source={require('../assets/images/estrelinhas.png')}
                                    style={styles.smallImageEstrelinhas}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textComentarios}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.pontosinteresse}>
                            <Image
                                source={require('../assets/images/menino.jpeg')}
                                style={styles.smallImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.subsubtitle}> João Pais </ Text>
                                <Image
                                    source={require('../assets/images/estrelinhas.png')}
                                    style={styles.smallImageEstrelinhas}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textComentarios}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => navigation.navigate('OutraPagina')}
                        >
                            <Text style={styles.buttonText1botao}> Ver Todos </ Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.content}>
                        <Text>Conteúdo do botão 2</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate('OutraPagina')}
                >
                    <Text style={styles.buttonText}>Let's UALK</Text>
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
        height: 200,
        marginTop: 20,
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
    smallestrelaAtividade: {
        width: 100,
        height: 100,
        marginRight: 50,
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
        width: '70%',
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
        fontSize: 16,
        fontWeight: 'bold',
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

    buttonImagePercurso:{
        width: '50%',
        height: '50%',
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
});

export default PercursoFlowConst;
