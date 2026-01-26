import {Text, View, StyleSheet} from 'react-native'

function index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> UrbanGO APK</Text>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '700',
    },
});