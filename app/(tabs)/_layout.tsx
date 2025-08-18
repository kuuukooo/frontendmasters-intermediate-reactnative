import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#29b365" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarShowLabel: false,
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
