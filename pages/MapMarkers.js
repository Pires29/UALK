import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Percursos  } from '../components/Percursos/Percursos';
import CustBottomSheet from '../components/Map/CustBottomSheet';

export default function MapMarkers() {

  
  const initialLocation = {
    latitude: 40.6405,
    longitude: -8.6538,
  };

  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]

  const [selectedPercursos, setSelectedPercursos] = useState([]);


  const handleMarkerPress = (marker) => {
    // Verifica se o marcador já está na lista
    const isMarkerExist = selectedPercursos.some(
      selected => selected.latitude === marker.latitude && selected.longitude === marker.longitude
    );

    if (isMarkerExist) {
      Alert.alert("Duplicado", "Este ponto já foi adicionado.");
      return;
    }

    if (selectedPercursos.length >= 2) {
      Alert.alert("Limite alcançado", "Você só pode adicionar dois pontos.");
      return;
    }

    setSelectedPercursos([...selectedPercursos, marker]);
  };


  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={mapDarkStyle}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        provider='google'
      >
        {Percursos.map((percurso, index) => (
          <React.Fragment key={index}>
            {[percurso.coordenadas.pontoA, percurso.coordenadas.pontoB].map((ponto, pontoIndex) => (
              <Marker
                key={pontoIndex}
                coordinate={{
                  latitude: ponto.latitude,
                  longitude: ponto.longitude,
                }}
              >
                <Callout tooltip onPress={() => handleMarkerPress(ponto)} style={styles.calloutContainer}>
                  <Text style={styles.title}>{ponto.title}</Text>
                  <Text style={styles.description}>{ponto.description}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleMarkerPress(ponto)} style={styles.button}>
                      <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            ))}
          </React.Fragment>
        ))}
      </MapView>
      <CustBottomSheet numero={1} selectedPercursos={selectedPercursos} setSelectedPercursos={setSelectedPercursos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    backgroundColor: '#2C333C',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  button: {
    borderColor: "#62BB76",
    borderWidth: 1,
    paddingVertical: 5,
    width: 150,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#62BB76',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
