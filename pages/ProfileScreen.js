import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../FireBase';
import { collection, query, where, getDocs, doc, onSnapshot } from 'firebase/firestore';
import AuthDetails from "../components/Autenticado";
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        const fetchUser = () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUser(currentUser);
                fetchComments(currentUser.uid);
                subscribeToFavorites(currentUser.uid);
            } else {
                console.log("No user is logged in.");
            }
        };

        fetchUser();
    }, []);

    const fetchComments = async (userId) => {
        console.log("Fetching comments for user ID:", userId);
        const q = query(collection(db, 'comments'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
    };

    const subscribeToFavorites = (userId) => {
        const userRef = doc(db, "users", userId);

        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const favoritos = doc.data().favoritos || [];
                setFavoritesCount(favoritos.length);
            }
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    };

    const goToOtherComponent = () => {
        navigation.navigate('Favorites');
    };

    const FirstRoute = () => (
        <View style={styles.content}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.pontosinteresse}>
                        <Icon
                            name="user-circle-o"
                            size={50}
                            color="#ffffff"
                            padding={10}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.subsubtitle}>{item.username}</Text>
                            <Text style={styles.textComentarios}>{item.comment}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );


    const renderScene = SceneMap({
        first: FirstRoute,
    });

    const TabViewExample = () => {
        const layout = useWindowDimensions();

        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([
            { key: 'first', title: 'Comentários' },
        ]);

        return (
            <TabView
                style={{ marginHorizontal: 40 }}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        );
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'transparent',
            }}
            indicatorContainerStyle={{
                backgroundColor: "transparent",
            }}
            style={{ backgroundColor: 'transparent' }}
            renderLabel={({ route, focused }) => {
                return <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold"}}>Comentários</Text>
            }}
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#2C333C"}}>
            <View style={{width: "100%", paddingHorizontal: 40, paddingTop: 70, paddingBottom: 20,}}>
                <View style={{flexDirection:"row" , marginBottom: 30}}>
                    
                <Icon
                            name="user-circle-o"
                            size={80}
                            color="#ffffff"
                        />
                    <View style={{}}>
                        <Text style={{ color: 'green', fontSize: 24, marginLeft: 30, }}>Olá,</Text>
                        <AuthDetails />
                        {user && <Text style={{ color: 'white', fontSize: 18 }}>{user.displayName}</Text>}
                    </View>
                </View>
                <TouchableOpacity onPress={goToOtherComponent}>
                    <View style={styles.containerN}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.maintext}>Favoritos</Text>
                            <Image
                                source={require('../imagens/icons/back-arrow.png')}
                                style={{ width: 20, height: 20 }}
                            />
                        </View>
                        <View style={styles.innerContainer2}>
                            
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{favoritesCount}</Text>
                                <Text style={styles.statLabel}>Favoritos</Text>
                            </View>
                            
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <TabViewExample/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
    },
    placeholder: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    itemGrid: {
        width: '30%',
        aspectRatio: 1,
        marginBottom: '3%',
    },
    imageGrid: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerN: {
        backgroundColor: "#7D8995",
        padding: 20,
        borderRadius: 3,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innerContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statNumber: {
        color: "white",
        fontSize: 22,
        marginBottom: 10,
    },
    statLabel: {
        color: "white",
        fontSize: 13,
    },
    maintext: {
        fontSize: 20,
        color: "white",
    },
    content: {
        marginTop: 20,
    },
    pontosinteresse: {
        flexDirection: 'row',
        marginVertical: 10,
        marginLeft: 0,
    },
    smallImage: {
        width: 75,
        height: 75,
        marginRight: 10,
        borderRadius: 10,
    },
    smallImageEstrelinhas: {
        width: 190,
        height: 20,
        marginRight: 10,
        borderRadius: 10,
        marginLeft: 7,
    },
    subsubtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    separator: {
        width: '93%',
        height: 4,
        backgroundColor: '#62BB76',
        marginVertical: 10,
        alignSelf: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    textComentarios: {
        fontSize: 13,
        color: 'white',
        textAlign: 'justify',
        marginTop: 8,
        marginBottom: 5,
        marginLeft: 5,
        width: "95%",
    },
    timestamp: {
        fontSize: 12,
        color: 'grey',
        textAlign: 'right',
        marginTop: 5,
        marginLeft: 5,
        width: "95%",
    },
});

export default ProfileScreen;
