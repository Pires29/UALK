import { Dimensions, StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native';
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
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef(null);
  const locationSubscription = useRef(null);

  console.log("selectedmarker", selectedMarker);

  useEffect(() => {
    async function fetchDirections() {
      if (!currentLocation || selectedMarker.length < 2) return;

      const origin = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
      const waypoints = `${selectedMarker[0].latitude},${selectedMarker[0].longitude}`;
      const destination = `${selectedMarker[1].latitude},${selectedMarker[1].longitude}`;
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&mode=walking&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { routes } = data;
        if (routes.length > 0) {
          const totalDistance = routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0);
          const totalDuration = routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);

          setDistance(`${(totalDistance / 1000).toFixed(2)} km`);
          setDuration(`${Math.floor(totalDuration / 60)} min`);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    }
    fetchDirections();
  }, [currentLocation, selectedMarker]);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setCurrentLocation(currentPosition);
      setLocation(currentPosition);
      console.log("Localização atual", currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  const startTrack = () => {
    if (!isTracking) {
      const watchLocation = async () => {
        locationSubscription.current = await watchPositionAsync({
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1
        }, (response) => {
          console.log("Nova Localização!", response);
          setCurrentLocation(response); // Atualiza a localização atual
          setLocation(response);
          mapRef.current?.animateCamera({
            center: {
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
            },
          });
        });
      };
      watchLocation();
    } else {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
    }
    setIsTracking(!isTracking);
  }

  const stopTrack = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setIsTracking(false);
  }

  const [region, setRegion] = useState({
    latitude: 40.6405,
    longitude: -8.6538,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.coords.latitude : selectedMarker.length > 0 ? selectedMarker[0].latitude : 40.6405,
            longitude: currentLocation ? currentLocation.coords.longitude : selectedMarker.length > 0 ? selectedMarker[0].longitude : -8.6538,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onRegionChangeComplete={setRegion}
          provider='google'
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="Sua Localização"
              description="Você está aqui"
            />
          )}
          {selectedMarker.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
            />
          ))}
          {currentLocation && selectedMarker.length > 1 && (
            <MapViewDirections
              origin={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
              waypoints={[{ latitude: selectedMarker[0].latitude, longitude: selectedMarker[0].longitude }]}
              destination={{ latitude: selectedMarker[1].latitude, longitude: selectedMarker[1].longitude }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="blue"
              mode="WALKING"
            />
          )}
        </MapView>
      )}
      {distance && duration && (
        <View style={styles.routeInfoContainer}>
          <Text style={styles.routeTitle}>Nome do Percurso</Text>
          <View style={styles.routeInfo}>
            <View>
              <Text style={styles.routeText}>{duration}</Text>
              <Text style={styles.routeCateText}>Tempo</Text>
            </View>
            <View>
              <Text style={styles.routeText}>{distance}</Text>
              <Text style={styles.routeCateText}>Distancia</Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button2}
              onPress={startTrack}
            >
              <Text style={styles.buttonText}>{isTracking ? "Parar" : "Iniciar"}</Text>
            </TouchableOpacity>
            {isTracking && (
              <TouchableOpacity
                style={styles.button2}
                onPress={stopTrack}
              >
                <Text style={styles.buttonText}>Terminar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <View style={styles.headerInfoContainer}>
        <View style={styles.headerBack}>
          <Image
            source={require('../imagens/icons/Vector White.png')} 
            style={{ width: 20, height: 20 }} 
          />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerText}>{selectedMarker[0].title}</Text>
          <Image
            source={require('../imagens/icons/back-arrow.png')} 
            style={{ width: 20, height: 20, marginHorizontal: 10 }} 
          />
          <Text style={styles.headerText}>{selectedMarker[1].title}</Text>
        </View>
      </View>
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
    width: '100%',
    backgroundColor: '#2C333C',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "white"
  },
  routeCateText: {
    color: "grey",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "regular"
  },
  routeInfo: {
    flexDirection: 'row',
  },
  headerInfoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#2C333C',
    padding: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1, // Adicionado para ocupar o espaço restante
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo do headerInfo
  },
  headerBack: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white"
  },
  routeText: {
    fontSize: 20,
    marginRight: 50,
    marginTop: 15,
    color: "white",
    fontWeight: "regular"
  },
  headerText: {
    fontSize: 18,
    color:"white"
  },
  startButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    marginRight: 20,
  },
  button2: {
    width: '44%',
    backgroundColor: '#62BB76',
    padding: 13,
    borderRadius: 9,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 35,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white"
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
