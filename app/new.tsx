import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { theme } from "@/theme";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function NewScreen() {
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();

  const handleSubmit = () => {
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

    console.log("Añadiendo planta...", name, days);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centered}>
        <PlantlyImage />
      </View>
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
    paddingTop: 24,
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
  centered: {
    alignItems: "center",
  },
});
