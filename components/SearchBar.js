import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {
    return (
        <View style={styles.searchBarContainer}>
            <Icon name="search" size={20} style={styles.icon} />
            <TextInput
                placeholder="Destino?"
                style={styles.input}
                onChangeText={onSearch}
            />
            <Icon name="options" size={20} style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7D8995',
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 20,
    },
    icon: {
        marginHorizontal: 5,
        color: 'white'
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white'
    },
});

export default SearchBar;
