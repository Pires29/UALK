import * as React from 'react';
import { View, Text } from 'react-native';

export default function Section3({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#2C333C"}}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold', color: "white"  }}>Em desenvolvimento...</Text>
        </View>
    );
}
