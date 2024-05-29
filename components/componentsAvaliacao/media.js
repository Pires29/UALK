import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { db, auth } from '../../FireBase'; // Certifique-se de que o caminho esteja correto
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import StarRating from './avaliacao';

const RatingScreen = () => {
    const [rating, setRating] = useState(0);
    const userId = auth.currentUser.uid;

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Por favor, selecione uma avaliação.");
            return;
        }

        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Atualize a avaliação no Firestore
                await updateDoc(userRef, {
                    avaliacao: rating,
                });
            } else {
                // Crie o documento com a avaliação inicial se não existir
                await setDoc(userRef, {
                    avaliacao: rating,
                });
            }

            alert("Avaliação salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar avaliação: ", error);
            alert("Erro ao salvar avaliação. Tente novamente.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <StarRating onRatingChange={handleRatingChange} />
            <Button title="Submeter Avaliação" onPress={handleSubmit} />
        </View>
    );
};

export default RatingScreen;
