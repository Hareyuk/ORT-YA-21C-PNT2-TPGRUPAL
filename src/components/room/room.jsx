import { Link, withLayoutContext } from "expo-router";
import { View, Text, StyleSheet, Button, Platform, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Room(props) {
    const { isPlaying, user1, user2, selectRoom, roomName } = props;
    
    // Extraer correctamente los nombres de usuario
    const user1Name = user1?.usuario?.usuario || "Esperando jugador 1";
    const user2Name = user2?.usuario?.usuario || "Esperando jugador 2";
    
    return (
        <>
            <TouchableOpacity style={styles.boxContainer} onPress={selectRoom}>
                <View style={styles.textColumn}>
                    <Text style={[styles.textInfo, styles.textBold]}>"{roomName}" - {!isPlaying ? "En espera" : "Lleno"}</Text>
                    <Text style={styles.textInfo}>{user1Name}</Text>
                    <Text style={styles.textInfo}>{user2Name}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}