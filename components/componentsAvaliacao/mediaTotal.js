import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { db } from '../../FireBase'; // Certifique-se de que o caminho esteja correto
import { collection, getDocs } from 'firebase/firestore';

const AverageRating = () => {

    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        // Função para calcular a média das avaliações
        const calculateAverageRating = async () => {
            try {
                // Recupere todas as avaliações dos usuários
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const ratings = [];

                usersSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.avaliacao) {
                        ratings.push(userData.avaliacao);
                    }
                });

                // Calcule a média das avaliações
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

        // Chame a função para calcular a média das avaliações
        calculateAverageRating();
    }, []);

    return (
        <View>
            <Text style={styles.textMedia}> {averageRating.toFixed(2)} </Text>
        </View>
    );
};

export default AverageRating;

const styles = StyleSheet.create({
    textMedia: {
        color: 'white',
        fontSize: 16,
    },
});
