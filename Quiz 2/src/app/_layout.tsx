import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Disney Movies",
          headerStyle: { backgroundColor: "blue" }, 
          headerTintColor: "#fff", 
        }}
      />
    </Stack>
  );
}
