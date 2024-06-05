import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationAccuracy, watchPositionAsync } from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBl6uQw0SyA0_I2utXTJJAj1BtBPhSoLDE';

export default function Map() {
  const navigation = useNavigation();
  const route = useRoute();
  const { percurso, selectedPercursos } = route.params;


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

  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
  const [distanceFinal, setDistanceFinal] = useState(0);
  const [distanceInicial, setDistanceInicial] = useState(0);
  const [durationFinal, setDurationFinal] = useState(0);
  const [durationInicial, setDurationInicial] = useState(0);

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

          setDistance(`${(totalDistance / 1000).toFixed(2)}`);
          setDuration(`${Math.floor(totalDuration / 60)}`);
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
      setIsLoading(false);
    } else {
      console.log("Permissão de localização negada");
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  const startTrack = () => {
    setStartTime(new Date());
    // Se já houver um tempo de início registrado, calcule a diferença de tempo e adicione-a à duração total
    if (startTime) {
      const elapsed = new Date() - startTime;
      const minutesElapsed = Math.floor(elapsed / 60000); // Converta para minutos
      setTotalDuration(totalDuration + minutesElapsed);
    }

    setDistanceInicial(distance)
    setDurationInicial(duration)
    console.log("DISTANCE INICIAL", distanceInicial)
    console.log("DURATION INICIAL", durationInicial)
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
    setStopTime(new Date());

    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setIsTracking(false);
    setShowStopButton(false);
    setShowResumeAndEndButtons(true);
  }

  const resumeTrack = () => {
    setStartTime(new Date());

    startTrack();
    setShowResumeAndEndButtons(false);
    setShowStopButton(true);
  }

  const endTrack = () => {
    const currentStopTime = new Date();
  const elapsed = currentStopTime - startTime;
  const minutesElapsed = Math.floor(elapsed / 60000); // Converta para minutos
  const totalDurationElapsed = totalDuration + minutesElapsed;

  console.log("MINUTOS CARALHOOOO", totalDurationElapsed)
    console.log("DistanceInicial", distanceInicial)
    console.log("Distance", distance)
    const distanceTraveled = distanceInicial - distance;
    const roundedDistanceTraveled = parseFloat(distanceTraveled.toFixed(2));
    console.log("CALCULO", roundedDistanceTraveled);

    console.log("DurationInicial", durationInicial)
    console.log("Duration", duration)
    const durationTraveled = durationInicial - duration;
    const roundedDurationTraveled = parseFloat(durationTraveled.toFixed(2));
    console.log("CALCULO", roundedDurationTraveled);


    setShowResumeAndEndButtons(false);
    setIsStarted(false);
    setDistanceFinal(distanceTraveled)
    console.log("PAPSPASDPADSPADAD",distanceFinal)

    setDurationFinal(durationTraveled)
    console.log("PAPSPASDPADSPADAD",distanceFinal)

    navigation.navigate('PaginaAvaliacao', { percurso: percurso,durationTraveled: totalDurationElapsed, distanceTraveled: roundedDistanceTraveled,distance: distance, duration: duration });
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
        source={require("../imagens/icons/CustomMarker.png")}
        style={{ width: 20, height: 20 }} // Ajuste o tamanho da imagem conforme necessário
      />
    </Marker>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{    flex: 1,
          width: "100%",
          backgroundColor: '#2C333C', // Altere para a cor de fundo desejada
          alignItems: "center",
          justifyContent: 'center',}}>
            <Image
                source={require('../imagens/LogoN.png')}
                style={{height: 60}}
            />
        <ActivityIndicator size="large" color="white" style={styles.loader} />
        <Text style={styles.loadingText}>A carregar o teu mapa...</Text>
      </View>
      ) : (
        location && (
          <>
            <MapView
              ref={mapRef}
              style={styles.map}
              customMapStyle={mapDarkStyle}
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
                  pinColor="#62BB76"
                />
              ))}
              {currentLocation && (
                <MapViewDirections
                  origin={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
                  waypoints={[{ latitude: pontoA.latitude, longitude: pontoA.longitude }]}
                  destination={{ latitude: pontoB.latitude, longitude: pontoB.longitude }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={4}
                  strokeColor="#7D8995"
                  mode="WALKING"
                />
              )}
            </MapView>
  
            {distance && duration && (
              <View style={styles.routeInfoContainer}>
                <Text style={styles.routeTitle}>Percurso</Text>
                <View style={styles.routeInfo}>
                  <View>
                    <Text style={styles.routeText}>{duration} min</Text>
                    <Text style={styles.routeCateText}>Tempo</Text>
                  </View>
                  <View>
                    <Text style={styles.routeText}>{distance} km</Text>
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="white" />
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
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText:{
    fontSize: 18,
    color: "white",
    marginTop: 10,

  },
  loader:{
    marginTop: 100,
  },
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
    flexWrap: "wrap"
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
