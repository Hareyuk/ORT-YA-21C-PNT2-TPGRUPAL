import { Link, withLayoutContext } from "expo-router";
import { View, Text, StyleSheet, Button, Platform, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Room(props) {
    const { isPlaying, user1, user2, selectRoom } = props;
    return (
        <TouchableOpacity style={styles.boxContainer} onPress={selectRoom}>
            <View style={styles.textColumn}>
                <Text style={[styles.textInfo, styles.textBold]}>Estado: {!isPlaying ? "En espera" : "Lleno"}</Text>
                <Text style={styles.textInfo}>{user1 != null ? user1.usuario : "Esperando jugador 1"}</Text>
                <Text style={styles.textInfo}>{user2 != null ? user2.usuario : "Esperando jugador 2"}</Text>
            </View>
        </TouchableOpacity>
    );
}