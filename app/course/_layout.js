import { Tabs, Slot, Stack } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
// import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Tabs>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Course",
          stackPresentation: "modal",
          stackAnimation: "slide_from_right",
          tabBarIcon: () => (
            <Feather name="book-open" size={24} color="#006D05" />
          ),
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
          title: "my course",
          stackPresentation: "modal",
          stackAnimation: "slide_from_right",
          tabBarIcon: () => (
            <MaterialIcons name="favorite" size={24} color="#006D05" />
          ),
        }}
      />
    </Tabs>
  );
}
