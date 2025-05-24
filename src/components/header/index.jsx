import { Link, withLayoutContext } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
return (
    <View style={styles.header}>
        <View>
          <Text style={styles.whiteText}>
            <Link href="/" style={styles.marginLR}>Ir a Home</Link>
            <Link href="/login" style={styles.marginLR}>Ir a Login</Link>
            <Link href="/signup" style={styles.marginLR}>Ir a Registro</Link>
            <Link href="/game" style={styles.marginLR}>Ir al Juego</Link>
            <Link href="/lobby" style={styles.marginLR}>Ir al Lobby</Link>
          </Text>
        </View>
    </View>
);
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3a2a23",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    whiteText: {
        color: "#fff",
    },
    marginLR: {
        marginLeft: 20,
        marginRight: 20,
    },
});