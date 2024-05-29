import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './Avaliação';
import { firestore } from './FireBase';

const Media = () => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const snapshot = await firestore.collection('ratings').get();
                const ratingsData = snapshot.docs.map(doc => doc.data().rating);
                setRatings(ratingsData);
            } catch (error) {
                console.error("Error fetching ratings: ", error);
            }
        };

        fetchRatings();
    }, []);

    const handleRatingSubmit = async (rating) => {
        try {
            await firestore.collection('ratings').add({ rating });
            setRatings((prevRatings) => [...prevRatings, rating]);
        } catch (error) {
            console.error("Error adding rating: ", error);
        }
    };

    const averageRating = () => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((a, b) => a + b, 0);
        return (sum / ratings.length).toFixed(1);
    };

    return (
        <View style={styles.container}>
            <Text>Média das Avaliações: {averageRating()}</Text>
            <StarRating onRatingSubmit={handleRatingSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default Media;
