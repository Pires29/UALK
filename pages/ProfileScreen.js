import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import AuthDetails from "../components/Autenticado";
import FavoriteList from "../components/Favorites";
import { useNavigation } from '@react-navigation/native';
import Favorites from './FavoritesPage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default function ProfileScreen() {

    const navigation = useNavigation();

    const goToOtherComponent = () => {
        navigation.navigate('Favorites');
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#2C333C"}}>
            <View style={{width: "100%", padding: 40,}}>
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
                    <Image
                        source={require('../imagens/image 17.png')}
                        style={{ width: 120, height: 120 }}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'green', fontSize: 24 }}>Olá,</Text>
                        <AuthDetails />
                    </View>
                </View>
                <TouchableOpacity onPress={goToOtherComponent}>
                <View style={styles.containerN}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.maintext}>Atividade</Text>
                        <Image
                            source={require('../imagens/icons/back-arrow.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={styles.innerContainer2}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>6</Text>
                            <Text style={styles.statLabel}>Concluídos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Favoritos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Eventos</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>

            <TabViewExample/>
        </View>
    );
}


const FirstRoute = () => (
    <View style={styles.content}>
                    {/* Conteúdo para o botão 1 */}
                    <View style={styles.pontosinteresse}>
                        <Image
                            source={require('../imagens/image 17.png')}
                            style={styles.smallImage}
                            resizeMode="contain"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.subsubtitle}> Marta Dias </Text>
                            <Image
                                source={require('../assets/images/Group 9.png')}
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
                            source={require('../assets/images/menino.jpeg')}
                            style={styles.smallImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.subsubtitle}> João Pais </Text>
                            <Image
                                source={require('../assets/images/Group 9.png')}
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
  );

  const SecondRoute = () => (
    <View style={{marginTop: 30}}>
        <GridExample/>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


export function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Comentários' },
      { key: 'second', title: 'Fotos' },
    ]);

    return (
        <TabView  style={{ marginHorizontal: 40 }}
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />

    );
  }

  const renderTabBar = props => (
    <TabBar
    {...props}
    indicatorStyle={{
    backgroundColor: '#62BB76',
    height: 4,
  }}
  indicatorContainerStyle={{
    backgroundColor: "white",
    height: 2,
    marginTop: 46,
  }}
    style={{ backgroundColor: 'none' }}
    renderLabel={({ route, focused }) => {
        return focused ? (
            <Text style={{ color: '#62BB76', fontSize: 16, minWidth: 100, textAlign: 'center' }}>{route.title}</Text>
        ) : (
            <Text style={{ color: 'white', fontSize: 16, minWidth: 100, textAlign: 'center' }}>{route.title}</Text>
        );
    }}
/>
  );

  export function GridExample() {
    // Array de imagens de exemplo
    const images = [
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
        require('../assets/images/image 7.png'),
    ];

    return (
        <View style={styles.containerGrid}>
            {images.map((image, index) => (
                <View key={index} style={styles.itemGrid}>
                    {index === 0 ? (
                        <View style={styles.placeholder}>
                            <Image source={require('../imagens/icons/back-arrow.png')} style={{width: 25, height: 25}}/>
                        </View>
                    ) : (
                        <Image source={image} style={styles.imageGrid} />
                    )}
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({

    containerGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
    },
    placeholder:{
        borderColor: 'white', // Cor da borda
        borderWidth: 1, // Largura da borda
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    itemGrid: {
        width: '30%',
        aspectRatio: 1, // Garante que as células tenham o mesmo tamanho
        marginBottom: '3%', // Margem inferior para separar as linhas
    },
    imageGrid: {
        width: '100%',
        height: '100%',
        borderRadius: 10, // Border radius para as imagens
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerN: {
        backgroundColor: "#7D8995",
        padding: 20,
        borderRadius: 3,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innerContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statNumber: {
        color: "white",
        fontSize: 22,
        marginBottom: 10,
    },
    statLabel: {
        color: "white",
        fontSize: 13,
    },
    maintext: {
        fontSize: 20,
        color: "white",
    },
    content: {
        marginTop: 20,
    },
    pontosinteresse: {
        flexDirection: 'row',
        marginVertical: 10,
        marginLeft: 0,
    },
    smallImage: {
        width: 75,
        height: 75,
        marginRight: 10,
        borderRadius: 10,
    },
    smallImageEstrelinhas: {
        width: 190,
        height: 20,
        marginRight: 10,
        borderRadius: 10,
        marginLeft: 7,
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
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    textComentarios: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        marginTop: 8,
        marginBottom: 8,
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
    buttonText1botao: {
        fontSize: 14,
        color: '#62BB76',
        fontWeight: 'bold',
    },
});