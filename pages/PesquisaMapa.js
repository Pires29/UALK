import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function PesquisaMapa({ selectedPercursos, setSelectedPercursos }) {
  useEffect(() => {
    console.log("selectedMarker foi alterado:", selectedPercursos);
  }, [selectedPercursos]);

  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChangeText = (text) => {
    setInput(text);
  };

  const navigation = useNavigation();

  const handleMarkerSelect = () => {
    if (selectedPercursos.length !== 2) {
      setErrorMessage("Please select exactly 2 markers.");
    } else {
      setErrorMessage("");
      navigation.navigate('Map', { selectedPercursos });
    }
  };

  const handleRemoveMarker = (marker) => {
    setSelectedPercursos(selectedPercursos.filter(item => item !== marker));
  };

  return (
    <View style={styles.container}>
      <View style={styles.markerDetails}>
        <Text style={styles.heading}>Pontos</Text>
        {selectedPercursos.length === 0 ? (
          <View style={styles.noMarkersContainer}>
            <Text style={styles.noMarkersText}>No markers available.</Text>
            <Text style={styles.noMarkersText}>Please add 2 markers.</Text>
          </View>
        ) : (
          selectedPercursos.map((marker, index) => (
            <View key={index}>
              <View style={styles.markerItem}>
                <View>
                  <Image style={styles.image} source={marker.source} />
                </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.markerTitle}>{marker.title}</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => handleRemoveMarker(marker)} style={styles.removeButton}>
                    <Image source={require('../imagens/icons/Remove.png')} style={styles.icon} />
                  </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.hr}></View>
            </View>
          ))
        )}
      </View>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      <View style={styles.markerDetails}>
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
    backgroundColor: '#2C333C',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 50,
    alignItems: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"white"
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
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
    color:"white"
  },
  markerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  markerDescription: {
    fontSize: 14,
    textAlign: 'center',
    color:"white"
  },
  textContainer: {
  },
  button: {
    backgroundColor: "#62BB76",
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
  },
  icon: {
    width: 15,
    height: 15,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    color:"white"
  },
  noMarkersContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noMarkersText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});

export default PesquisaMapa;
