import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationAccuracy, watchPositionAsync } from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBl6uQw0SyA0_I2utXTJJAj1BtBPhSoLDE';

export default function Map() {
  const navigation = useNavigation();
  const route = useRoute();
  const { percurso, selectedPercursos } = route.params;


  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showStopButton, setShowStopButton] = useState(false);
  const [showResumeAndEndButtons, setShowResumeAndEndButtons] = useState(false);
  const mapRef = useRef(null);
  const locationSubscription = useRef(null);

  let pontoA, pontoB;
  if (selectedPercursos && selectedPercursos.length > 0) {
    pontoA = selectedPercursos[0];
    pontoB = selectedPercursos[1];
  } else if (percurso && percurso.coordenadas) {
    pontoA = percurso.coordenadas.pontoA;
    pontoB = percurso.coordenadas.pontoB;
  }

  useEffect(() => {
    async function fetchDirections() {
      if (!currentLocation || !pontoA || !pontoB) return;

      const origin = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
      const waypoints = `${pontoA.latitude},${pontoA.longitude}`;
      const destination = `${pontoB.latitude},${pontoB.longitude}`;
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
  }, [currentLocation, pontoA, pontoB]);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest });
      setCurrentLocation(currentPosition);
      setLocation(currentPosition);
      console.log("Localização atual", currentPosition);
    } else {
      console.log("Permissão de localização negada");
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
    setIsStarted(true); // Marca que o rastreamento foi iniciado
    setShowStopButton(true);
  }

  const stopTrack = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setIsTracking(false);
    setShowStopButton(false);
    setShowResumeAndEndButtons(true);
  }

  const resumeTrack = () => {
    startTrack();
    setShowResumeAndEndButtons(false);
    setShowStopButton(true);
  }

  const endTrack = () => {
    setShowResumeAndEndButtons(false);
    setIsStarted(false);
    navigation.navigate('PaginaAvaliacao', { percurso: percurso, distance: distance, duration: duration });
  }

  const [region, setRegion] = useState({
    latitude: pontoA.latitude,
    longitude: pontoA.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const CustomMarker = ({ coordinate, title, description }) => (
    <Marker coordinate={coordinate}>
      <Image
        source={require("../imagens/image 5.png")}
        style={{ width: 40, height: 40 }} // Ajuste o tamanho da imagem conforme necessário
      />
    </Marker>
  );

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.coords.latitude : pontoA.latitude,
            longitude: currentLocation ? currentLocation.coords.longitude : pontoA.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onRegionChangeComplete={setRegion}
          provider='google'
        >
          {currentLocation && (
            <CustomMarker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="Sua Localização"
              description="Você está aqui"
            />
          )}
          {[pontoA, pontoB].map((ponto, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
              title={ponto.title}
              description={ponto.description}
            />
          ))}
          {currentLocation && (
            <MapViewDirections
              origin={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
              waypoints={[{ latitude: pontoA.latitude, longitude: pontoA.longitude }]}
              destination={{ latitude: pontoB.latitude, longitude: pontoB.longitude }}
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
          <Text style={styles.routeTitle}>Percurso</Text>
          <View style={styles.routeInfo}>
            <View>
              <Text style={styles.routeText}>{duration}</Text>
              <Text style={styles.routeCateText}>Tempo</Text>
            </View>
            <View>
              <Text style={styles.routeText}>{distance}</Text>
              <Text style={styles.routeCateText}>Distância</Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            {!isStarted && (
              <TouchableOpacity
                style={styles.button2}
                onPress={startTrack}
              >
                <Text style={styles.buttonText}>Iniciar</Text>
              </TouchableOpacity>
            )}
            {showStopButton && (
              <TouchableOpacity
                style={styles.button2}
                onPress={stopTrack}
              >
                <Text style={styles.buttonText}>Parar</Text>
              </TouchableOpacity>
            )}
          </View>
          {showResumeAndEndButtons && (
            <View style={styles.buttonRow2}>
              <TouchableOpacity
                style={styles.button3}
                onPress={resumeTrack}
              >
                <Text style={styles.buttonText}>Retomar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={endTrack}
              >
                <Text style={styles.buttonText}>Terminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <View style={styles.headerInfoContainer}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <Image
            source={require('../imagens/icons/Vector White.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerText}>{pontoA.title}</Text>
          <Image
            source={require('../imagens/icons/back-arrow.png')}
            style={{ width: 20, height: 20, marginHorizontal: 10 }}
          />
          <Text style={styles.headerText}>{pontoB.title}</Text>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: "white"
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
  button3: {
    width: '44%',
    borderColor: "#62BB76",
    borderWidth: 2,
    padding: 12,
    borderRadius: 9,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 35,
  },
  buttonNoBackground: {
    width: '44%',
    backgroundColor: 'transparent',
    padding: 13,
    borderRadius: 9,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 35,
    borderColor: "#62BB76",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white"
  },
  buttonTextNoBackground: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#62BB76",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
