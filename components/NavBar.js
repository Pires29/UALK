import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Button } from 'react-native'
import HomeIcon from '../assets/icons/Home.png';
import UalkIcon from '../assets/icons/pegada.png';
import ProfileIcon from '../assets/icons/image 8.png';
import Section2Icon from '../assets/icons/pegada.png';
import Section3Icon from '../assets/icons/pegada.png';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Favorites from '../pages/Favorites';
import { useNavigation } from '@react-navigation/native';

// Screens
import HomeScreen from '../pages/HomeScreen';
import UalkScreen from '../pages/UalkScreen';
import ProfileScreen from '../pages/ProfileScreen';
import Section2 from '../pages/Section2';
import Section3 from '../pages/Section3';


//Screen names
const homeName = "Home";
const ualkName = "UALK";
const profileName = "Profile";
const section2Name = "Section 2";
const section3Name = "Section 3";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente de navegação principal
function NavPages() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      {/* Defina as telas da sua aplicação aqui */}
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Favorites" component={Favorites} options={{
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
          headerBackImage: () => (
            <Image
              source={require('../assets/icons/back-arrow.png')} // Insira o caminho do seu ícone personalizado aqui
              style={{ width: 24, height: 24, tintColor: 'white' }} // Ajuste o tamanho e a cor do ícone conforme necessário
            />
          ),
        }}/>
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
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
            height: 70,
          },
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize;
        
            // Defina o tamanho do ícone com base no nome da rota ou em outra lógica
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

            // You can return any component that you like here!
            return <Image source={iconName} style={{ width: iconSize, height: iconSize, tintColor: color }} />;
          },
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={ualkName} component={UalkScreen} />
        <Tab.Screen name={section2Name} component={Section2} />
        <Tab.Screen name={section3Name} component={Section3} />
        <Tab.Screen name={profileName} component={NavPages} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
