import { useUserStore } from "@/store/userStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Redirect, Tabs } from "expo-router";

export default function RootLayout() {
  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding
  );
  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#29b365" }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Inicio",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
