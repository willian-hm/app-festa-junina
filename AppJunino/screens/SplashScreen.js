import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import chapeu from '../assets/chapeu.png';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace('Cardapio'), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={chapeu} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3D2C8D', justifyContent: 'center', alignItems: 'center' },
  img: { width: 150, height: 150 }
});
