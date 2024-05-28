import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UalkIcon from './imagens/icons/pegada.png';
import ProfileIcon from './imagens/icons/image 8.png';
import Section2Icon from './imagens/icons/pegada.png';
import Section3Icon from './imagens/icons/pegada.png';

// Import Screens
import PaginaAvaliacao from './components/PaginaAvaliacao';
import CriarConta from './components/componentsConta/CriarConta';
import Login from './components/componentsConta/Login';
import UalkScreen from "./components/UalkScreen";
import Favorites from "./components/Favorites";
import ProfileScreen from "./components/ProfileScreen";
import Section2 from "./components/Section2";
import HomeScreen from "./components/HomeScreen";
import Section3 from "./components/Section3";

// Screen names
const ualkName = "UALK";
const profileName = "Settings";
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

                    if (route.name === ualkName) {
                        iconName = focused ? UalkIcon : UalkIcon;
                        iconSize = 40;
                    } else if (route.name === profileName) {
                        iconName = focused ? ProfileIcon : ProfileIcon;
                        iconSize = 28;
                    } else if (route.name === section2Name) {
                        iconName = focused ? Section2Icon : Section2Icon;
                        iconSize = 34;
                    } else if (route.name === section3Name) {
                        iconName = focused ? Section3Icon : Section3Icon;
                        iconSize = 34;
                    }

                    return <Image source={iconName} style={{ width: iconSize, height: iconSize, tintColor: color }} />;
                },
            })}
        >
            <Tab.Screen name={ualkName} component={UalkScreen} />
            <Tab.Screen name={section2Name} component={Section2} />
            <Tab.Screen name={section3Name} component={Section3} />
            <Tab.Screen name={profileName} component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="CriarConta" component={CriarConta} options={{ headerShown: false }} />
                    <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} />
                    <Stack.Screen name="PaginaAvaliacao" component={PaginaAvaliacao} options={{ headerShown: false }} />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
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
