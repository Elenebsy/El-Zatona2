import { Stack } from "expo-router";
import CustomHeader from "../../Components/CustomHeader";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          header: () => <CustomHeader />,
        }}
      />
    </Stack>
  );
}
