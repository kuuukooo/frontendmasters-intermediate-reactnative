import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { usePlantStore } from "@/store/plantsStore";
import { theme } from "@/theme";
import { differenceInCalendarDays, formatDate } from "@/utils/dateUtils";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function PlantDetails() {
  const router = useRouter();
  const waterPlant = usePlantStore((store) => store.waterPlant);
  const removePlant = usePlantStore((store) => store.removePlant);
  const params = useLocalSearchParams();
  const plantId = params.plantId;
  const plant = usePlantStore((state) =>
    state.plants.find((plant) => String(plant.id) === plantId)
  );
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: plant?.name,
    });
  }, [plant?.name, navigation]);

  const handleWaterPlant = () => {
    if (typeof plantId === "string") {
      waterPlant(plantId);
    }
  };

  const handleDeletePlant = () => {
    if (!plant?.id) {
      return;
    }

    Alert.alert(
      `¿Estás seguro que quieres eliminar ${plant?.name}?`,
      "Se irá para siempre...",
      [
        {
          text: "Si",
          onPress: () => {
            removePlant(plant.id);
            router.navigate("/");
          },
          style: "destructive",
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          La planta con el id {plantId} no fue encontrada.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <View style={{ alignItems: "center" }}>
        <PlantlyImage imageUri={plant.imageUri} />
        <View style={styles.spacer} />
        <Text style={styles.key}>Riégame cada</Text>
        <Text style={styles.value}>{plant.wateringFrequencyDays} días</Text>
        <Text style={styles.key}>Último riego</Text>
        <Text style={styles.value}>
          {plant.lastWateredAtTimestamp
            ? formatDate(plant.lastWateredAtTimestamp)
            : "Nunca 😟"}
        </Text>
        <Text style={styles.key}>Días desde el último riego</Text>
        <Text style={styles.value}>
          {plant.lastWateredAtTimestamp
            ? differenceInCalendarDays(Date.now(), plant.lastWateredAtTimestamp)
            : "N/A"}
        </Text>
      </View>
      <PlantlyButton title="Ríegame!" onPress={handleWaterPlant} />
      <Pressable style={styles.deleteButton} onPress={handleDeletePlant}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  notFoundText: {
    fontSize: 18,
  },
  detailsContainer: {
    padding: 12,
    backgroundColor: theme.colorWhite,
    flex: 1,
    justifyContent: "center",
  },
  key: {
    marginRight: 8,
    fontSize: 16,
    color: theme.colorBlack,
    textAlign: "center",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: theme.colorGreen,
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: theme.colorGrey,
    fontWeight: "bold",
  },
  spacer: {
    height: 18,
  },
});
