import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import ConcluidosPercurso from './ConcluidosPercurso';
import EventosPercurso from './EventosPercurso';

function Eventos() {
  return (
    <ScrollView>
      <EventosPercurso/>
      <EventosPercurso/>
      <EventosPercurso/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default Eventos;
