import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './components/NavBar';
import Mapa from './pages/Map'
import  DescriptionPage from './pages/Description'
import PercursoFlowConst from '../UALK/pages/PercursoFlow'

export default function App() {
  return (
      <PercursoFlowConst/>
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
