import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Star from './estrela';

const StarRating = ({ onRatingSubmit }) => {
    const [rating, setRating] = useState(0);

    const handleStarPress = (index) => {
        setRating(index + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.starsContainer}>
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        selected={index < rating}
                        onPress={() => handleStarPress(index)}
                    />
                ))}
            </View>
            <Button title="Enviar Avaliação" onPress={() => onRatingSubmit(rating)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    starsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
});

export default StarRating;
