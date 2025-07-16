import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Button,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistroFoto from '../components/RegistroFoto';
import { Ionicons } from '@expo/vector-icons';

const bandeiras = require('../assets/bandeiras.png');
const { width, height } = Dimensions.get('window');

export default function HistoricoScreen({ navigation, route }) {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    carregarFotos();
  }, []);

  
  useEffect(() => {
    if (route.params?.novaFoto) {
      setFotos((fotosAntigas) => {
        if (fotosAntigas.includes(route.params.novaFoto)) {
          return fotosAntigas; 
        }
        const novaLista = [...fotosAntigas, route.params.novaFoto];
        salvarFotos(novaLista);
        return novaLista;
      });


      navigation.setParams({ novaFoto: undefined });
    }
  }, [route.params?.novaFoto]);

  const salvarFotos = async (lista) => {
    try {
      await AsyncStorage.setItem('fotos', JSON.stringify(lista));
    } catch (e) {
      console.error('Erro ao salvar fotos', e);
    }
  };

  const carregarFotos = async () => {
    try {
      const json = await AsyncStorage.getItem('fotos');
      if (json) setFotos(JSON.parse(json));
    } catch (e) {
      console.error('Erro ao carregar fotos', e);
    }
  };

  const deletarFoto = async (uri) => {
    const novas = fotos.filter(f => f !== uri);
    setFotos(novas);
    salvarFotos(novas);
  };

  const abrirCamera = () => {
    navigation.navigate('Camera');
  };

  const voltarCardapio = () => {
    navigation.navigate('Cardapio');
  };

  return (
    <View style={styles.container}>

      {/* Imagens de fundo */}
      <Image source={bandeiras} style={[styles.fundoImagem, styles.topo]} resizeMode="contain" />
      <Image source={bandeiras} style={[styles.fundoImagem, styles.centro]} resizeMode="contain" />
      <Image source={bandeiras} style={[styles.fundoImagem, styles.base]} resizeMode="contain" />

      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltarCardapio} style={styles.botaoVoltar}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Botão abrir câmera */}
      <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
        <Button title="Abrir Câmera" onPress={abrirCamera} color="#A85F0F" />
      </View>

      <FlatList
        data={fotos}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RegistroFoto uri={item} onDelete={deletarFoto} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8C630' },

  fundoImagem: {
    position: 'absolute',
    width: 450,
    height: 450,
    opacity: 0.3,
  },
  topo: {
    top: 10,
  },
  centro: {
    top: 250,
  },
  base: {
    bottom: -20,
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A85F0F',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoVoltar: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
});
