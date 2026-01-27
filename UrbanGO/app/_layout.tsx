import { Stack, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function RootLayout() {
    // const [loading, setLoading] = useState(true);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    // //  Aquí validas sesión real
    //     const checkSession = async () => {
    //     const token = null; // cámbialo luego
    //     setIsAuthenticated(!!token);
    //     setLoading(false);
    // };

    // checkSession();
    // }, []);

    // if (loading) {
    //     return <View />; // splash o loader
    // }

    // if (!isAuthenticated) {
    //     return <Redirect href="/auth/index" />;
    // }

    return (
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" />
    </Stack>
    );
}
