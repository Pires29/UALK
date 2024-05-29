import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function PesquisaMapa({ selectedMarker, setSelectedMarker }) {
  useEffect(() => {
    console.log("selectedMarker foi alterado:", selectedMarker);
  }, [selectedMarker]); 

  const [input, setInput] = useState("");

  const handleOnChangeText = (text) => {
    setInput(text);
  };

  const navigation = useNavigation();

  const handleMarkerSelect = () => {
    navigation.navigate('Map', { selectedMarker });
  };

  const handleRemoveMarker = (marker) => {
    setSelectedMarker(selectedMarker.filter(item => item !== marker));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter city name"
          onChangeText={handleOnChangeText}
          value={input}
          style={styles.input}
        />
      </View>
      <View style={styles.markerDetails}>
        <Text style={styles.heading}>Pontos</Text>
        {selectedMarker.map((marker, index) => (
          <View key={index}>
            <View style={styles.markerItem}>
              <View>
                <Image style={styles.image} source={marker.source} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.markerTitle}>{marker.title}</Text>
                <Text style={styles.markerDescription}>{marker.description}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveMarker(marker)} style={styles.removeButton}>
                <Image source={require('../assets/favicon.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
          </View>
        ))}
      </View>
      <View style={styles.markerDetails}>
        <View style={styles.markerItem}>
          <Image
            source={require('../assets/Add_round.png')}
            style={styles.imagePlus}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Adicionar Paragem</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleMarkerSelect} style={styles.button}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 50,
    alignItems: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 20,
    width: '100%',
  },
  input: {
    backgroundColor: "lightgrey",
    width: 300,
    paddingHorizontal: 30,
    paddingVertical:10,
    borderRadius: 50,
    fontSize: 16,
    color: 'white'
  },
  markerDetails: {
    marginHorizontal: 60,
  },
  markerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  markerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  markerDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  button: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    width: 200,
    borderRadius: 15,
    marginTop: 100,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  removeButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PesquisaMapa;