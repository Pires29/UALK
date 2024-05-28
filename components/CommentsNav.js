import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Comments from './HomeStack/Comments';
import Photos from './HomeStack/Photos';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from '../pages/ProfileScreen';

const HomeStack = createMaterialTopTabNavigator();

function CommentsNav() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Main" component={ProfileScreen}/>
        <HomeStack.Screen name="Photos" component={Photos}/>
        <HomeStack.Screen name="Comments" component={Comments}/>
    </HomeStack.Navigator>
  )
}

export default CommentsNav
