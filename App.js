import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './components/NavBar';
import Favorites from './pages/Favorites'; // Importe o componente Favorites aqui
import PopUp from './components/PopUp';

export default function App() {
  return (
      <NavBar/>
      /*<PopUp/>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
