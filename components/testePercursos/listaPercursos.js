import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PercursoCard from './PercursoCard';

const PercursosList = ({ percursosData }) => {
    const [percursoSelecionado, setPercursoSelecionado] = useState(null);

    const handlePercursoPress = (index) => {
        setPercursoSelecionado(index);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                {percursosData.map((percurso, index) => (
                    <PercursoCard
                        key={index}
                        data={percurso}
                        onPress={() => handlePercursoPress(index)}
                    />
                ))}
            </ScrollView>
            {/* Aqui você pode renderizar os detalhes do percurso selecionado */}
            {percursoSelecionado !== null && (
                <DetalhesPercurso percurso={percursosData[percursoSelecionado]} />
            )}
        </SafeAreaView>
    );
};

export default PercursosList;
