import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            backgroundColor: '#7D8995',
            height: 70,
          },
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === ualkName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === section2Name) {
                iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === section3Name) {
                iconName = focused ? 'settings' : 'settings-outline';
              }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
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