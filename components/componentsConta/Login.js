import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../FireBase';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const LogIn = async () => {
        try {
            const email = await getEmailFromUsername(username);
            if (!email) {
                new Error('Username não encontrado');
            }

            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Login com sucesso');
            navigation.navigate('NavBar');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao fazer login', error.message);
        }
    };

    const getEmailFromUsername = async (username) => {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const userDoc = querySnapshot.docs[0];
        return userDoc.data().email;
    };

    return (
        <View style={styles.LoginContainer}>
            <Image
                source={require('../../imagens/LogoN.png')}
                style={styles.logo}
            />
            <Text style={styles.titulo}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Coloca o teu username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#ccc"
            />
            <TextInput
                style={styles.input}
                placeholder="Coloca a tua password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#ccc"
            />
            <View style={styles.descricaoContainer}>
                <Text style={styles.descricao}>Ainda não tens conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CriarConta')}>
                    <Text style={styles.link}> Criar Conta</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.botaoLogin} onPress={LogIn}>
                <Text style={styles.textoBotao}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#2C333C',
    },
    logo: {
        width: 260,
        height: 100,
        marginBottom: 40,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: '#7D8995',
        backgroundColor: '#7D8995',
        borderRadius: 4,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        width: '100%',
    },
    botaoLogin: {
        backgroundColor: '#62BB76',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    descricaoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    descricao: {
        fontSize: 13,
        fontWeight: '300',
        color: '#7D8995',
    },
    link: {
        fontSize: 13,
        fontWeight: '300',
        color: '#62BB76',
        textDecorationLine: 'underline',
    },
});

export default Login;
