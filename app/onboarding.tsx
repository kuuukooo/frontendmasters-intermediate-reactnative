import { PlantlyButton } from "@/components/PlantlyButton";
import { useUserStore } from "@/store/userStore";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };
  return (
    <View style={styles.container}>
      <PlantlyButton title="Dejame entrar!" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
});
