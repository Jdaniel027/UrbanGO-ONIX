import { Redirect } from "expo-router";

// Este archivo lo unico que hace es redireccionar a la carpeta /main o /auth dependiendo si ya tiene cuneta o no
export default function Index() {
  const isAuthenticated = true; // luego token real

  return isAuthenticated ? (
    <Redirect href="/main" />
  ) : (
    <Redirect href="/auth" />
  );
}
