import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import ConcluidosPercurso from './ConcluidosPercurso';

function Concluidos() {
  return (
    <ScrollView>
      <ConcluidosPercurso/>
      <ConcluidosPercurso/>
      <ConcluidosPercurso/>
      <ConcluidosPercurso/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default Concluidos;
