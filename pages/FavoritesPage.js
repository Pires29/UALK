import * as React from 'react';
import { Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import Concluidos from '../components/Atividade/Concluidos';
import Favoritos from '../components/Atividade/Favoritos';
import FavoriteList from "../components/Favorites";
import Eventos from '../components/Atividade/Eventos';
import { useNavigation } from '@react-navigation/native';


export default function FavoritesPage() {
  const layout = useWindowDimensions();
  const navigation = useNavigation(); // Obtém a instância de navegação

  const handleImagePress = () => {
    navigation.navigate('Profile'); // Navega para 'OutraPagina' quando a imagem é pressionada
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#2C333C"}}>


<FavoriteList/>
    </View>
  );
}

const renderTabBar = props => (
    <TabBar
    {...props}
    indicatorStyle={{
    backgroundColor: '#62BB76',
    height: 2,
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
