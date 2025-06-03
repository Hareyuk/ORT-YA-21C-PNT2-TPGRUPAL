import { Link, withLayoutContext } from "expo-router";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import styles from "./styles";

export default function Room(props) {
    const { isPlaying, user1, user2 } = props;
    return (
        <Button style={styles.boxContainer}>
            <View style={styles.textColumn}>
                <Text>Estado: {!isPlaying ? "En espera" : "Lleno"}</Text>
                <Text>{user1 != null ? user1.usuario : "Esperando jugador 1"}</Text>
                <Text>{user2 != null ? user2.usuario : "Esperando jugador 2"}</Text>
            </View>
        </Button>
    );
}