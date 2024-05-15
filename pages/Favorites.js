import * as React from 'react';
import { Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import Concluidos from '../components/Atividade/Concluidos';
import Favoritos from '../components/Atividade/Favoritos';
import Eventos from '../components/Atividade/Eventos';
import { useNavigation } from '@react-navigation/native';

const FirstRoute = () => (
  <Concluidos/>
);

const SecondRoute = () => (
  <Favoritos/>
);

const ThirdRoute = () => (
    <Eventos/>
  );

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function Favorites() {
  const layout = useWindowDimensions();
  const navigation = useNavigation(); // Obtém a instância de navegação

  const handleImagePress = () => {
    navigation.navigate('Profile'); // Navega para 'OutraPagina' quando a imagem é pressionada
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Concluídos' },
    { key: 'second', title: 'Favoritos' },
    { key: 'third', title: 'Eventos' }
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#2C333C"}}>
      {/*<View style={{flexDirection: "row",justifyContent:"center", padding: 30}}>
        <View style={{justifyContent: "left"}}>
          <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={require('../assets/icons/back-arrow.png')} // Substitua './caminho/para/sua/imagem.jpg' pelo caminho relativo da sua imagem
            style={{ width: 20, height: 20 }} // Ajuste a largura e altura conforme necessário
          />
          </TouchableOpacity>
        </View>
        <View>
          <Text>Texto acima do TabView</Text>
        </View>
  </View>*/}

      <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
    </View>
  );
}

const renderTabBar = props => (
    <TabBar
    {...props}
    indicatorStyle={{
    backgroundColor: 'green',
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
            <Text style={{ color: 'green', fontSize: 16, minWidth: 100, textAlign: 'center' }}>{route.title}</Text>
        ) : (
            <Text style={{ color: 'white', fontSize: 16, minWidth: 100, textAlign: 'center' }}>{route.title}</Text>
        );
    }}
/>
  );