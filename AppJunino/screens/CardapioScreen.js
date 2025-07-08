import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CardItem from '../components/cardItem';

const itens = [
  { id: '1', nome: 'Pipoca', preco: 5 },
  { id: '2', nome: 'Canjica', preco: 7 },
  { id: '3', nome: 'Maçã do amor', preco: 4 },
  { id: '4', nome: 'Pamonha', preco: 6 },
  { id: '5', nome: 'Quentão', preco: 8 },
];

export default function CardapioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8C630' }}>
      <Text style={styles.title}>Cardápio Junino</Text>
      <FlatList
        data={itens}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Camera')}>
        <Text style={{ color: 'white' }}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', backgroundColor: '#3D2C8D', padding: 10, width: 500, height: 70, paddingTop: 25 },
  botao: { backgroundColor: '#D94600', padding: 15, alignItems: 'center', margin: 10, borderRadius: 10 }
});