import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import { useAuthBootstrap } from "@/features/auth/hooks/useAuthBootstrap";
import { AppLoaderScreen } from "@/shared/components/ui/AppLoaderScreen";

function RootNavigator() {
  const { isBootstrapping } = useAuthBootstrap();

  if (isBootstrapping) {
    return <AppLoaderScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="wardrobe-add" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
