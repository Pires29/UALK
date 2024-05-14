import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const DescriptionPage = ({ navigation }) => {

    const handleButtonPress = () => {
        // Navegar para outra página quando o botão é pressionado
        navigation.navigate('colocarapagina');
    }

        // botão comentarios e fotos
        const [selectedButton, setSelectedButton] = useState(1);

        const handleButtonPress2 = (buttonNumber) => {
            setSelectedButton(buttonNumber);
    };

    return (

        <View style={styles.container}>
            <View style={styles.background} />

            {/* Início com uma imagem */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
                source={require('./images/porsol.png')}
                style={styles.image}
                resizeMode="cover"
            />


            {/* Titlo e imagem dos passos */}

            <View style={styles.field}>
                <Text style={styles.title}>Percurso da Marinha da Casqueira</Text>
                <Image
                    source={require('./images/passos.png')}
                    style={styles.smallpassos}
                    resizeMode="cover"
                />
            </View>


            {/* Estrela e quantidade*/}

            <View style={styles.avaliacao}>
                <Image
                    source={require('./images/estrela.png')}
                    style={styles.smallImage2}
                    resizeMode="cover"
                />
                <Text style={styles.textavaliacao}> 4.7 (49) </Text>
            </View>


            {/* Caracteristicas do percurso*/}

            <View style={styles.avaliacao}>
                <Text style={styles.textavaliacao}>  </Text>
            </View>


            {/* Descrição */}

            <View style={styles.descricao}>
                <Text style={styles.subtitle}> Descrição </Text>
                <Text style={styles.text}>Este é um percurso agradável que se inicia na Casa do Estudante e acaba na belíssima marinha da Casqueira.
                    Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro, enquanto ouves uma música relaxante.  </Text>
            </View>


            {/* Pontos de interesse */}
                <View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Pontos de Interesse </Text>
                </View>
            <View style={styles.pontosinteresse}>
                <Image
                    source={require('./images/casaestudante.png')}
                    style={styles.smallImage}
                    resizeMode="cover"
                />
                <View style={styles.textContainer}>
                <Text style={styles.subsubtitle}> Casa do estudante </Text>
                <Text style={styles.text2}>Edifício que alberga a sede da Associação Académica da Universidade de Aveiro (AAUAv). </Text>
                </View>
            </View>

                <View style={styles.pontosinteresse}>
                    <Image
                        source={require('./images/porsol.png')}
                        style={styles.smallImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.subsubtitle}> Marinha da Casqueira </Text>
                        <Text style={styles.text3}>Marinha que se encontra junto à Universidade </Text>
                    </View>
                </View>


                {/* Mapa */}
                <View style={styles.descricao}>
                    <Text style={styles.subtitle2}> Mapa </Text>
                </View>

                {/* Botão com imagem que direciona para outra página */}
                <TouchableOpacity
                    style={styles.buttonWithImage}
                    onPress={handleButtonPress}
                >
                    <Image
                        source={require('./images/mapa.png')}
                        style={styles.buttonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>



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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start', // Alinhar o conteúdo no início
    },

    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#2C333C', // Cor de fundo cinza
    },

    image: {
        width: '100%',
        height: 200, // Altura da imagem, ajuste conforme necessário
        marginTop: 20, // Espaçamento superior
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
        paddingHorizontal: 20, // espaço entre estrela e texto
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
        width: 190,
        height: 20,
        marginRight: 10,
        borderRadius: 10,
        marginLeft: 7,
    },

    smallImage2: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginLeft: 20,
    },

    smallpassos: {
        width: 50,
        height: 50,
        marginRight: 20,
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

    title:{
        width: '75%',
        fontSize:24,
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },

    subtitle:{
        width: '80%',
        fontSize:18,
        color: 'white',
        marginTop: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 20,
    },

    subtitle2:{
        width: '80%',
        fontSize:18,
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
        marginLeft: 20,
    },

    subsubtitle:{
        fontSize:16,
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

    // botões normais

    button1: {
        width: '40%',
        padding: 12,
        borderRadius: 5,
        marginTop: 35,
        marginVertical: 10,
        marginLeft: 25,
        alignItems: 'center',
        borderWidth: 2,  // Definir a largura da borda
        borderColor: '#62BB76',  // Definir a cor da borda
        backgroundColor: 'transparent',  // Tornar o fundo transparente
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

    //_________________//

    scrollViewContent: {
        paddingBottom: 40, // Serve para o conteúdo não ficar colocado no final
    },

    pontosinteresse: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },

    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start', // Alinha os textos verticalmente
    },

    // botão do mapa

    buttonWithImage: {
        width: 320, // Largura do botão
        height: 122, // Altura do botão
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20, // Espaçamento inferior
    },

    buttonImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },

    // botões dinamicos

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

export default DescriptionPage;
