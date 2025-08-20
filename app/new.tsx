import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantUploadBox } from "@/components/PlantUploadBox";
import { usePlantStore } from "@/store/plantsStore";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function NewScreen() {
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();
  const [imageUri, setImageUri] = useState<string>();
  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      return Alert.alert("Error de Validacion", "Dale un nombre a tu planta");
    }

    if (!days) {
      return Alert.alert(
        "Error de Validacion",
        `¿Cada cuanto hay que regar a ${name}?`
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Error de Validacion",
        "La frecuencia de riego debe de ser un número."
      );
    }

    try {
      await addPlant(name, Number(days), imageUri);
      router.navigate("/");
      console.log("Añadiendo planta...", name, days, imageUri);
    } catch (error) {
      console.error("Error adding plant:", error);
      Alert.alert("Error", "No se pudo agregar la planta. Inténtalo de nuevo.");
    }
  };

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
    console.log("Imagen seleccionada:", uri);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {imageUri ? (
        <TouchableOpacity
          style={styles.centered}
          onPress={() => setImageUri(undefined)}
          activeOpacity={0.8}
        >
          <PlantlyImage
            imageUri={imageUri}
            fixedSize={{ width: 360, height: 300 }}
          />
        </TouchableOpacity>
      ) : (
        <PlantUploadBox onImageSelected={handleImageSelected} />
      )}

      <View style={styles.buttonsContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="E.j. Plantita"
          autoCapitalize="words"
        />
        <Text style={styles.label}>Frecuencia de Riego (cada x días)</Text>
        <TextInput
          value={days}
          onChangeText={setDays}
          style={styles.input}
          placeholder="E.j. 6"
          keyboardType="number-pad"
        />
      </View>

      <PlantlyButton title="Añadir planta" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: 24,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
