import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Instale usando `npm install react-native-vector-icons`

const StarRating = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0);

    const handleStarPress = (star) => {
        const newRating = star === rating ? 0 : star; // Se clicar na mesma estrela, reseta para 0
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                    <Icon
                        name={star <= rating ? 'star' : 'star-o'}
                        size={30}
                        color="#FFD700"
                        style={styles.star}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    star: {
        marginHorizontal: 5,
    },
});

export default StarRating;
