import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from "./components/componentsConta/gerirAutenticacao";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UalkIcon from './imagens/icons/pegada.png';
import HomeIcon from './imagens/icons/Home.png';
import ProfileIcon from './imagens/icons/image 8.png';
import Section2Icon from './imagens/icons/pegada.png';
import Section3Icon from './imagens/icons/pegada.png';
import RatingScreen from './components/componentsAvaliacao/percurso1/media'; // Importação do componente de avaliação
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Importar Screens
import PaginaAvaliacao from './components/PaginaAvaliacao';
import CriarConta from './components/componentsConta/CriarConta';
import Login from './components/componentsConta/Login';
import UalkScreen from "./pages/UalkScreen";
import FavoritesPage from "./pages/FavoritesPage";
import ProfileScreen from "./pages/ProfileScreen";
import Section2 from "./components/Section2";
import HomeScreen from "./components/HomeScreen";
import Section3 from "./pages/Section3";
import Map from './pages/Map';
import MapMarkers from './pages/MapMarkers';
import Description from './pages/Description';
import DescriptionAtividades from "./pages/DescriptionAtividade";

// Nomes das telas
const homeName = "Home";
const ualkName = "UALK";
const profileName = "Profile";
const section2Name = "Section 2";
const section3Name = "Section 3";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'lightgrey',
                tabBarLabelStyle: {
                    fontSize: 14,
                },
                tabBarItemStyle: {
                    paddingVertical: 10,
                },
                tabBarStyle: {
                    backgroundColor: "#2C333C",
                    height: 100,
                },
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let iconSize;

                    if (route.name === homeName) {
                      iconName = focused ? HomeIcon : HomeIcon;
                      iconSize = 24; // Tamanho específico para o ícone "Home"
                  } else if (route.name === ualkName) {
                      iconName = focused ? UalkIcon : UalkIcon;
                      iconSize = 40; // Tamanho específico para o ícone "UALK"
                  } else if (route.name === profileName) {
                      iconName = focused ? ProfileIcon : ProfileIcon;
                      iconSize = 28; // Tamanho específico para o ícone "Settings"
                  } else if (route.name === section2Name) {
                      iconName = focused ? Section2Icon : Section2Icon;
                      iconSize = 34; // Tamanho específico para o ícone "Section 2"
                  } else if (route.name === section3Name) {
                      iconName = focused ? Section3Icon : Section3Icon;
                      iconSize = 34; // Tamanho específico para o ícone "Section 3"
                  }

                    return <Image source={iconName} style={{ width: iconSize, height: iconSize, tintColor: color }} />;
                },
            })}
        >

            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={ualkName} component={UalkScreen} />
            <Tab.Screen name={section2Name} component={Section2} />
            <Tab.Screen name={section3Name} component={Section3} />
            <Tab.Screen name={profileName} component={ProfileScreen} />
        </Tab.Navigator>
    );

}

const App = () => {
    return (
        <GestureHandlerRootView>
        <NavigationContainer>
            <AuthProvider>

            <View style={styles.container}>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="CriarConta" component={CriarConta} options={{ headerShown: false }} />
                    <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} />
                    <Stack.Screen name="PaginaAvaliacao" component={PaginaAvaliacao} options={{ headerShown: false }} />
                    {/* Adiciona o stack de navegação para a tela de avaliação */}
                    <Stack.Screen name="Avaliacao" component={RatingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Description" component={Description} options={{ headerShown: false }} />
                    <Stack.Screen name="DescriptionAtividade" component={DescriptionAtividades} options={{ headerShown: false }} />
                    <Stack.Screen name="Favorites" component={FavoritesPage} options={{
          headerTitle: "Atividade",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2C333C', // Define a cor de fundo como transparente
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerTintColor: 'white', // Define a cor do texto do título como branco
          headerBackTitleStyle: {
          color: 'white', // Define a cor do texto de voltar atrás como branco
          },

        }}/>
                    <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
                    <Stack.Screen
  name="Mapa"
  component={MapMarkers}
  options={({ navigation }) => ({
    headerShown: true,
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: '#2C333C', // Define a cor de fundo como transparente
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: 'white',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('outrapagina')} style={{ paddingLeft: 10}}>
        <Image
            source={require('./imagens/icons/Vector White.png')} // Substitua './caminho/para/sua/imagem.jpg' pelo caminho relativo da sua imagem
            style={{ width: 20, height: 20 }} // Ajuste a largura e altura conforme necessário
          />
      </TouchableOpacity>
    ),
  })}
/>
                </Stack.Navigator>
            </View>
            </AuthProvider>
        </NavigationContainer>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C333C',
    },
    content: {
        flex: 1,
    },
});

export default App;
