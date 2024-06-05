import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { db } from '../../../FireBase'; // Certifique-se de que o caminho esteja correto
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const AverageRating2 = ({ percurso }) => {
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
                    if (userData.avaliacao2) {
                        ratings.push(userData.avaliacao2);
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
                console.error("Erro ao calcular média de avaliações 2: ", error);
            }
        };

        // Chama a função para calcular a média das avaliações
        calculateAverageRating();
    }, [percurso]); // Dependência em 'percurso' para recalcular a média se o percurso mudar

    // Função para renderizar as estrelas
    const renderStars = () => {
        const fullStars = Math.floor(averageRating);
        const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <View style={styles.starsContainer}>
                {Array(fullStars).fill().map((_, index) => (
                    <Icon key={`full-${index}`} name="star" size={15} color="white" style={styles.star} />
                ))}
                {halfStar === 1 && (
                    <Icon key="half" name="star-half" size={15} color="white" style={styles.star} />
                )}
                {Array(emptyStars).fill().map((_, index) => (
                    <Icon key={`empty-${index}`} name="star-o" size={15} color="white" style={styles.star} />
                ))}
            </View>
        );
    };

    return (
        <View>
            {renderStars()}
        </View>
    );
};

export default AverageRating2;

const styles = StyleSheet.create({
    textMedia: {
        color: 'white',
        fontSize: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        marginHorizontal: 2,
    },
});
