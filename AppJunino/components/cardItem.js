import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardItem({ item }) {
  const [curtido, setCurtido] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.nome}>{item.nome}</Text>
        <TouchableOpacity onPress={() => setCurtido(!curtido)}>
          <Ionicons
            name={curtido ? 'heart' : 'heart-outline'}
            size={24}
            color={curtido ? '#ff4d4d' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3D2C8D',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  preco: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
  },
});
