import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../FireBase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CriarConta = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const criarConta = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await saveUserInfoFS(user.uid, email, username);
            Alert.alert('Conta criada com sucesso');
            navigation.navigate('NavBar');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao fazer registo', error.message);
        }
    };

    const saveUserInfoFS = async (uid, email, username) => {
        try {
            const userRef = doc(db, "users", uid);
            await setDoc(userRef, {
                email: email,
                username: username,
            });
        } catch (error) {
            console.error("Erro ao salvar informações do usuário no Firestore:", error);
        }
    };

    return (
        <View style={styles.criarContaContainer}>
            <Image
                source={require('../../imagens/LogoN.png')}
                style={styles.logo}
            />
            <Text style={styles.titulo}>Criar Conta</Text>
            <TextInput
                style={styles.input}
                placeholder="Coloca o teu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#ccc"
            />
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
                <Text style={styles.descricao}>Já tens conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}> Fazer Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.botaoCriar} onPress={criarConta}>
                <Text style={styles.textoBotao}>Criar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    criarContaContainer: {
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
    botaoCriar: {
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

export default CriarConta;
