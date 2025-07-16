import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';   
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [facing, setFacing] = useState('back');     
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleFacing = () => {
    setFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const tirarFoto = async () => {
  if (!cameraRef.current) return;
  try {
    const foto = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      skipProcessing: true,
    });

    const fileName = `foto_${Date.now()}.jpg`;
    const newPath = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: foto.uri, to: newPath });

    const fotosSalvas = await AsyncStorage.getItem('fotos');
    const fotosArray = fotosSalvas ? JSON.parse(fotosSalvas) : [];

    const novaLista = [newPath, ...fotosArray];
    await AsyncStorage.setItem('fotos', JSON.stringify(novaLista));

    navigation.navigate('Historico', { novaFoto: newPath });
  } catch (err) {
    Alert.alert('Erro', 'Não foi possível tirar a foto.');
    console.error(err);
  }
};

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Solicitando permissão...</Text></View>;
  }
  if (!hasPermission) {
    return <View style={styles.center}><Text>Sem acesso à câmera.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        ratio="16:9"
      >
        <View style={styles.controls}>
          <TouchableOpacity onPress={tirarFoto} style={styles.capture}>
            <Ionicons name="camera" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFacing} style={styles.flip}>
            <MaterialIcons name="flip-camera-android" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: 'flex-end' },
  controls: {
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 20, backgroundColor: 'rgba(0,0,0,0.3)',
  },
  capture: {
    backgroundColor: '#D94600', borderRadius: 35,
    padding: 15, justifyContent: 'center', alignItems: 'center',
  },
  flip: {
    backgroundColor: '#555', borderRadius: 30,
    padding: 10, justifyContent: 'center', alignItems: 'center',
  },
});
