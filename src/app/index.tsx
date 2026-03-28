import { Redirect, type Href } from "expo-router";

import { useAppSelector } from "@/store/hooks";

export default function Index() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return <Redirect href={(isAuthenticated ? "/home" : "/login") as Href} />;
}
