import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native'
import HomeIcon from '../assets/icons/Home.png';
import UalkIcon from '../assets/icons/pegada.png';
import ProfileIcon from '../assets/icons/image 8.png';
import Section2Icon from '../assets/icons/pegada.png';
import Section3Icon from '../assets/icons/pegada.png';

// Screens
import HomeScreen from '../pages/HomeScreen';
import UalkScreen from '../pages/UalkScreen';
import ProfileScreen from '../pages/ProfileScreen';
import Section2 from '../pages/Section2';
import Section3 from '../pages/Section3';


//Screen names
const homeName = "Home";
const ualkName = "UALK";
const profileName = "Settings";
const section2Name = "Section 2";
const section3Name = "Section 3";

const Tab = createBottomTabNavigator();

function NavBar() {
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
        <Tab.Screen name={profileName} component={ProfileScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavBar