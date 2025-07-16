import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardItem({ item }) {
  const [curtido, setCurtido] = useState(false);
  const [mostrarIngredientes, setMostrarIngredientes] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.nome}>{item.nome}</Text>
        <TouchableOpacity onPress={() => setCurtido(!curtido)}>
          <Ionicons
            name={curtido ? 'heart' : 'heart-outline'}
            size={24}
            color={curtido ? '#ff4d4d' : '#000'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setMostrarIngredientes(!mostrarIngredientes)}
      >
        <Text style={styles.textoBotao}>
          {mostrarIngredientes ? 'Ocultar ingredientes' : 'Ver ingredientes'}
        </Text>
      </TouchableOpacity>

      {mostrarIngredientes && (
        <View style={styles.listaIngredientes}>
          {item.ingredientes.map((ing, index) => (
            <Text key={index} style={styles.ingrediente}>
              • {ing}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF2CC',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    opacity: 0.85
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  preco: {
    color: '#000',
    marginTop: 8,
    fontSize: 16,
  },
  botao: {
    marginTop: 10,
    backgroundColor: '#D94600',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  listaIngredientes: {
    marginTop: 10,
    paddingLeft: 8,
  },
  ingrediente: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
});
