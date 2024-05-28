import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';

function ConcluidosPercurso() {
  return (
    <View>
      <View style={styles.itemContainer}>
        <Image source={require('../../assets/images/image 7.png')} style={styles.image} />
        <View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Percurso da Casqueira</Text>
          <Image source={require('../../assets/images/Group 9.png')}/>
          <Text></Text>
        </View>
        <View style={{flexDirection: "row"}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Comprimento</Text>
                <Text style={styles.textLight}>6km</Text>
            </View>
            <View>
                <Text style={styles.text}>Tempo</Text>
                <Text style={styles.textLight}>1:12h</Text>
            </View>
        </View>  
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 0,
      padding: 0,
    },
    itemContainer: {
      flexDirection: 'row',
      margin: 25,
    },
    image: {
      width: 110,
      height: 110,
      marginRight: 20,
      borderRadius: 10,
    },
    textContainer: {
      flex: 1,
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
    separator: {
      width: '100%',
      height: 4,
      backgroundColor: '#62BB76',
      alignSelf: 'center',
  },
  
  });
  
export default ConcluidosPercurso;