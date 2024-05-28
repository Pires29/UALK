// components/PopUp.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const PopUp = ({ visible, onClose, title, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Ansiedade</Text>
          <Text style={styles.message}>A atividade física aumenta a produção e a libertação de neurotransmissores no cérebro, como serotonina e dopamina, responsáveis por regular o humor, o sono, o apetite, o ritmo cardíaco e a memória.</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350,
    paddingHorizontal: 45,
    paddingVertical: 30,
    backgroundColor: '#2C333C',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "white"
  },
  message: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: "white"
  },
  button: {
    backgroundColor: '#7D8995',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PopUp;
