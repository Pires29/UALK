import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, Button, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { markers } from '../components/Map/markers';
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

  const [selectedMarker, setSelectedMarker] = useState([]);

  const handleMarkerPress = (marker) => {
    if (selectedMarker.length >= 2) {
      Alert.alert("Limite alcançado", "Você só pode adicionar dois pontos.");
      return;
    }
    setSelectedMarker([...selectedMarker, marker]);
  };

  console.log("Markers", selectedMarker);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        provider='google'
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Callout onPress={() => handleMarkerPress(marker)}>
              <Text style={styles.title}>{marker.title}</Text>
              <Text style={styles.description}>{marker.description}</Text>
              <Button 
                title="Adicionar" 
                onPress={() => handleMarkerPress(marker)}
              />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <CustBottomSheet numero={1} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
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
  callout: {
    width: 200,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
