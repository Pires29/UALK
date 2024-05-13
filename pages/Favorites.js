import * as React from 'react';
import { View, Text } from 'react-native';

export default function Favorites({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Section3 In Development...</Text>
        </View>
    );
}