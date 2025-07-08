import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistroFoto from '../components/RegistroFoto';

export default function HistoricoScreen({ route }) {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    carregarFotos();
  }, []);

  useEffect(() => {
    if (route.params?.novaFoto) {
      const novaLista = [...fotos, route.params.novaFoto];
      setFotos(novaLista);
      salvarFotos(novaLista);
    }
  }, [route.params?.novaFoto]);

  const salvarFotos = async (fotos) => {
    await AsyncStorage.setItem('fotos', JSON.stringify(fotos));
  };

  const carregarFotos = async () => {
    const json = await AsyncStorage.getItem('fotos');
    if (json) setFotos(JSON.parse(json));
  };

  const deletarFoto = async (uri) => {
    const novas = fotos.filter(f => f !== uri);
    setFotos(novas);
    salvarFotos(novas);
  };

  return (
    <View style={styles.container}>
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
  container: { flex: 1, padding: 10, backgroundColor: '#F8C630' },
});
