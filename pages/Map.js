import { Dimensions, StyleSheet, View, Text, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationAccuracy, watchPositionAsync } from 'expo-location';
import { useRoute } from '@react-navigation/native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBl6uQw0SyA0_I2utXTJJAj1BtBPhSoLDE';

export default function Map() {
  const route = useRoute();
  const { selectedMarker } = route.params;

  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  console.log("selectedmarker", selectedMarker)

  useEffect(() => {
    const fetchDirections = async () => {
      if (selectedMarker.length < 2) return;

      const origin = `${selectedMarker[0].latitude},${selectedMarker[0].longitude}`;
      const destination = `${selectedMarker[selectedMarker.length - 1].latitude},${selectedMarker[selectedMarker.length - 1].longitude}`;
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { routes } = data;
        if (routes.length > 0) {
          const { distance, duration } = routes[0].legs[0];
          setDistance(distance.text);
          setDuration(duration.text);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    fetchDirections();
  }, [selectedMarker]);

  const mapRef = useRef(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("Localização atual", currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      console.log("Nova Localização!", response);
      setLocation(response);
      mapRef.current?.animateCamera({
        center: {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        },
      });
    });
  }, []);

  const [region, setRegion] = useState({
    latitude: 40.6405,
    longitude: -8.6538,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    
    <View style={styles.container}>
      {location && <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: selectedMarker.length > 0 ? selectedMarker[0].latitude : location.coords.latitude,
          longitude: selectedMarker.length > 0 ? selectedMarker[0].longitude : location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onRegionChangeComplete={setRegion}
        provider='google'
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
        {selectedMarker.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />
        ))}
        <MapViewDirections
          origin={selectedMarker.length > 0
            ? { latitude: selectedMarker[0].latitude, longitude: selectedMarker[0].longitude }
            : null
          }
          destination={selectedMarker.length > 0
            ? { latitude: selectedMarker[selectedMarker.length - 1].latitude, longitude: selectedMarker[selectedMarker.length - 1].longitude }
            : null
          }
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>}
      {distance && duration && (
        <View style={styles.routeInfoContainer}>
          <Text style={styles.routeTitle}>Nome do Percurso</Text>
          <View style={styles.routeInfo}>
            <Text style={styles.text}>{duration}</Text>
            <Text>{distance}</Text>
          </View>
            <View style={styles.startButtonContainer}>
            <Button title="Iniciar"/>
            </View>
        </View>
      )}
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
  routeInfoContainer: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routeInfo: {
    flexDirection: 'row',
  },
  startButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    marginRight: 20,
  }
});
