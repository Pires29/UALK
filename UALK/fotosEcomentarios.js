import React, {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DescriptionPage from "./description";

const FotosEcomentarios = ({ navigation }) => {

    // botão comentarios e fotos
    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonPress2 = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    return (

        <View style={styles.container}>
            <View style={styles.background} />

                {/* Fotos e Comentários */}
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

                {/* Barra por baixo dos botões, já abaixo está o que é necessário para ter a barra quando está selecionado */}
                <View style={[styles.bar, { marginLeft: selectedButton === 1 ? 0 : '50%' }]} />

                {/* Conteúdo que muda quando um botão é selecionado */}
                {selectedButton === 1 ? (
                    <View style={styles.content}>
                        {/* Conteúdo para o botão 1 */}
                        <View style={styles.pontosinteresse}>
                            <Image
                                source={require('./images/menina.png')}
                                style={styles.smallImage}
                                resizeMode="contain"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.subsubtitle}> Marta Dias </Text>
                                <Image
                                    source={require('./images/estrelinhas.png')}
                                    style={styles.smallImageEstrelinhas}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textComentarios}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </Text>
                        </View>

                        {/* Barra separadora */}
                        <View style={styles.separator} />

                        <View style={styles.pontosinteresse}>
                            <Image
                                source={require('./images/menino.png')}
                                style={styles.smallImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.subsubtitle}> João Pais </Text>
                                <Image
                                    source={require('./images/estrelinhas.png')}
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
                            <Text style={styles.buttonText1botao}> Ver Todos </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.content}>
                        {/* Conteúdo para o botão 2 */}
                        <Text>Conteúdo do botão 2</Text>
                    </View>
                )}
                {/* Dois botões */}

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate('OutraPagina')}
                >
                    <Text style={styles.buttonText}>Let's UALK</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start', // Alinhar o conteúdo no início
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
            borderBottomWidth: 4,  // Definir a largura da borda apenas na parte inferior
            borderColor: 'white',  // Definir a cor da borda
    },

    selectedButton: {
        borderBottomWidth: 4,  // Definir a largura da borda apenas na parte inferior
            borderColor: '#62BB76',  // Definir a cor da borda
    },

    buttonText2: {
        fontSize: 16,
            color: 'white',
    },

    content: {
        marginTop: 20,
    },
    });

export default FotosEcomentarios;
