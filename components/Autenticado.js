import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../FireBase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const AuthDetails = () => {
    const navigation = useNavigation();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setAuthUser({
                        uid: user.uid,
                        email: user.email,
                        username: userDoc.data().username, // Certifique-se de que o campo 'username' está presente
                    });
                }
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('Login');
                console.log('Logout com sucesso');
            })
            .catch(error => console.log(error));
    };

    return (
        <View style={styles.container}>
            {authUser ? (
                <>
                    <Text style={styles.text}>{authUser.username}</Text>
                    <TouchableOpacity style={styles.button} onPress={userSignOut}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.text}>Não há usuário autenticado</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#62BB76',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AuthDetails;

