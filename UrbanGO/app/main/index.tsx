import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
    return (
    <View style={styles.card}>
        <Text style={styles.title}>UrbanGO</Text>
        <Text>Selecciona tu ruta</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
    marginTop: 50,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
    },
    title: {
    fontSize: 18,
    fontWeight: 'bold',
    },
});
