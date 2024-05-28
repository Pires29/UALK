import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './components/NavBar';
<<<<<<< Celina
import Mapa from './pages/Map'
import  DescriptionPage from './pages/Description'
import PercursoFlowConst from '../UALK/pages/PercursoFlow'
import PaginaAvaliacao from "./pages/PaginaAvaliacao";
import Media from "./components/media";

export default function App() {
  return (
      <PaginaAvaliacao/>
=======
import Favorites from './pages/Favorites'; // Importe o componente Favorites aqui
import PopUp from './components/PopUp';

export default function App() {
  return (
      <NavBar/>
      /*<PopUp/>*/
>>>>>>> MergeTeste
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
