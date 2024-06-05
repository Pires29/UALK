import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../../../FireBase'; // Certifique-se de que o caminho esteja correto
import { collection, getDocs } from 'firebase/firestore';

const AvaliacaoNumero3 = ({ percurso }) => {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        // Função para calcular a média das avaliações
        const calculateAverageRating = async () => {
            try {
                // Recupera todas as avaliações dos usuários
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const ratings = [];

                usersSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.avaliacao3) {
                        ratings.push(userData.avaliacao3);
                    }
                });

                // Calcula a média das avaliações
                const totalRatings = ratings.length;
                if (totalRatings > 0) {
                    const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
                    const average = sumRatings / totalRatings;
                    setAverageRating(average);
                }
            } catch (error) {
                console.error("Erro ao calcular média de avaliações: ", error);
            }
        };

        // Chama a função para calcular a média das avaliações
        calculateAverageRating();
    }, [percurso]); // Dependência em 'percurso' para recalcular a média se o percurso mudar

    return (
        <View>
            <Text style={styles.textMedia}> {averageRating.toFixed(2)}</Text>
        </View>
    );
};

export default AvaliacaoNumero3;

const styles = StyleSheet.create({
    textMedia: {
        color: 'white',
        fontSize: 16,
    },
});