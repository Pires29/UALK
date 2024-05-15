import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import FavoritosPercurso from './FavoritosPercurso';

function Favoritos() {
  return (
    <ScrollView>
      <FavoritosPercurso/>
      <FavoritosPercurso/>
      <FavoritosPercurso/>
      <FavoritosPercurso/>
      <FavoritosPercurso/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default Favoritos;
