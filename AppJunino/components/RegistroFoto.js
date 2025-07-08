import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegistroFoto({ uri, onDelete }) {
  return (
    <View style={styles.imgContainer}>
      <Image source={{ uri }} style={styles.img} />
      <TouchableOpacity style={styles.delete} onPress={() => onDelete(uri)}>
        <Ionicons name="trash" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: { position: 'relative', margin: 5 },
  img: { width: 100, height: 100, borderRadius: 10 },
  delete: { position: 'absolute', top: 5, right: 5, backgroundColor: '#D94600', borderRadius: 10, padding: 3 }
});
