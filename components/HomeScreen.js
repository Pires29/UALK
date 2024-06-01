import * as React from 'react';
import { Image, TouchableOpacity} from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', padding: 40, backgroundColor: "#2C333C" }} onPress={() => navigation.navigate('Login')}>

                <Image
                    source={require('../imagens/Logo.png')} // Substitua './caminho/para/sua/imagem.jpg' pelo caminho relativo da sua imagem
                    style={{ width: 300, height: 300, marginTop: 140 }} // Ajuste a largura e altura conforme necessário
                />

        </TouchableOpacity>

    );
}
