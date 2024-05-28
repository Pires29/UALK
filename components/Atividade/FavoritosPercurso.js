import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';

function FavoritosPercurso() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/image 7.png')} style={styles.imagemPercurso} />
      <View style={styles.infoPercurso}>
        <Text style={styles.text}>Percurso da Casqueira</Text>
        <Image source={require('../../assets/images/Group 9.png')} style={{marginBottom: 8}} />
        <Text style={styles.textLight}>15km</Text>
        <View style={styles.descricaoContainer}>
          <Text style={styles.textLight}>Aqui podemos ver este magnifico cagalhao a aparecer aqui</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    padding: 20
  },
  imagemPercurso: {
    width: 110,
    height: 110,
    marginRight: 10,
    borderRadius: 10,
  },
  infoPercurso: {
    flex: 1,
  },
  nomePercurso: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemDescricao: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  descricaoPercurso: {
    flex: 1,
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 8
  },
  textLight: {
    fontSize: 14,
    fontWeight: 'thin',
    color: "white",
    marginBottom: 8
  },
});
  
export default FavoritosPercurso;