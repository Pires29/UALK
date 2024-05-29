import React, { useRef, useState } from 'react';
import { FlatList, View, Image } from 'react-native';

// Exemplo de dados para o slider
const data = [
    require('../imagens/image4.png'),
    require('../imagens/image 6.png'),
    require('../imagens/image 5.png'),
];

const Slider = () => {
    const flatListRef = useRef(null); // Referência para o FlatList
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar a posição atual do slider

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
        setCurrentIndex(currentIndex);
    };

    const renderItem = ({ item }) => (
        <Image
            source={item}
            style={{
                width: 400,
                height: 200,

            }}
        />
    );

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                horizontal
                snapToInterval={400} // Largura de cada imagem no slider
                decelerationRate={0} // Define a desaceleração para 0 para que pare imediatamente após o gesto de rolagem
                snapToAlignment={'center'} // Centraliza as imagens
                onScroll={handleScroll} // Manipulador de eventos para atualizar o estado currentIndex
                scrollEventThrottle={200} // Define a frequência de atualização do evento de rolagem
                showHorizontalScrollIndicator={false}

            />
        </View>
    );
}

export default Slider;
