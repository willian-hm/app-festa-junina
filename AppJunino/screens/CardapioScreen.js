import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const bandeiras = require('../assets/bandeiras.png');

const itens = [
  { id: '1', nome: 'Pipoca', preco: 5 },
  { id: '2', nome: 'Canjica', preco: 7 },
  { id: '3', nome: 'Maçã do amor', preco: 4 },
  { id: '4', nome: 'Pamonha', preco: 6 },
  { id: '5', nome: 'Quentão', preco: 8 },
];

// Card individual com botão de curtir
function CardItem({ item }) {
  const [curtido, setCurtido] = React.useState(false);

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

export default function CardapioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Imagens de fundo posicionadas */}
      <Image source={bandeiras} style={[styles.fundoImagem, styles.topo]} resizeMode="contain" />
      <Image source={bandeiras} style={[styles.fundoImagem, styles.centro]} resizeMode="contain" />
      <Image source={bandeiras} style={[styles.fundoImagem, styles.base]} resizeMode="contain" />
      
      {/* Conteúdo normal da tela */}
      <Text style={styles.title}>🎉 Cardápio Junino 🎉</Text>

      <FlatList
        data={itens}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Menu de navegação */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={styles.textoBotao}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Historico')}
        >
          <Ionicons name="albums-outline" size={20} color="white" />
          <Text style={styles.textoBotao}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// pega largura e altura da tela pra posicionar as imagens melhor
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CC',
  },
  fundoImagem: {
    position: 'absolute',
    width: 400,   
    height: 400, 
    opacity: 0.3,         
  },
  topo: {
    top: 10,
    alignSelf: 'center',
  },
  centro: {
    top: height / 2 - (height * 0.15) / 2, // vertical centralizado
    alignSelf: 'center',
  },
  base: {
    bottom: 20,
    alignSelf: 'center',
  },
  // ... seu styles originais ...
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3D2C8D',
    backgroundColor: '#FFD966',
    paddingVertical: 15,
    textAlign: 'center',
    elevation: 4,
    shadowColor: '#000',
  },
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
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3D2C8D',
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 20,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D94600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});