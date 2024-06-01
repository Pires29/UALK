import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { db, auth } from '../../../FireBase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import StarRating3 from './avaliacao3'; // Importando o componente corrigido

const RatingScreen3 = ({ percurso }) => {
    const [rating, setRating] = useState(0);
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Por favor, selecione uma avaliação.");
            return;
        }

        if (!userId) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Atualize a avaliação no Firestore
                await updateDoc(userRef, {
                    avaliacao3: rating,
                });
            } else {
                // Crie o documento com a avaliação inicial se não existir
                await setDoc(userRef, {
                    avaliacao3: rating,
                });
            }

            alert("Avaliação3 salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar avaliação: ", error);
            alert("Erro ao salvar avaliação. Tente novamente.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <StarRating3 onRatingChange={handleRatingChange} />
            <Button title="Submeter Avaliação" onPress={handleSubmit} />
        </View>
    );
};

export default RatingScreen3;
