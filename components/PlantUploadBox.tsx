import { theme } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PlantUploadBoxProps {
  onImageSelected?: (imageUri: string) => void;
}

export function PlantUploadBox({ onImageSelected }: PlantUploadBoxProps) {
  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      // Solicitar permisos para la galería
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // Solicitar permisos para la cámara
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();

      if (galleryStatus !== "granted" || cameraStatus !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Necesitamos permisos para acceder a la cámara y galería para que puedas subir fotos de tus plantas.",
          [{ text: "OK" }]
        );
        return false;
      }
    }
    return true;
  };

  const handleImageSelection = () => {
    Alert.alert(
      "Seleccionar imagen",
      "¿Cómo te gustaría agregar una foto de tu planta?",
      [
        {
          text: "Cámara",
          onPress: takePhoto,
        },
        {
          text: "Galería",
          onPress: pickImage,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "No se pudo tomar la foto. Inténtalo de nuevo.");
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert(
        "Error",
        "No se pudo seleccionar la imagen. Inténtalo de nuevo."
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleImageSelection}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <AntDesign
          name="camera"
          size={40}
          color={theme.colorGreen}
          style={styles.icon}
        />
        <Text style={styles.text}>Elige una imagen o saca una!</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 300,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: theme.colorGreen,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    alignSelf: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: theme.colorGrey,
    textAlign: "center",
    fontWeight: "500",
  },
});
