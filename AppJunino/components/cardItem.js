import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.preco}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#3D2C8D', padding: 15, margin: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' },
  nome: { color: 'white', fontWeight: 'bold' },
  preco: { color: 'white' }
});