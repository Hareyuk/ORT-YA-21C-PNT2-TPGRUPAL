import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
return (
    <View style={styles.footer}>
        <View style={styles.containerFooter}>
            <Text style={styles.whiteText}>©Axel Dumas, Martín Palma y Dylan Sosa Domecq - 2025</Text>
        </View>
    </View>
);
}


const styles = StyleSheet.create({
  footer:
    {
        width: "100%",
        height: "5%",
        backgroundColor: "#3a2a23",
        paddingVertical: "1em"
    },
    containerFooter:
    {
        display: "flex",
        paddingHorizontal: "1em",
        maxWidth: "1920px",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: "1em",
        textAlign: "center"
    },
    whiteText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    },
    logoFooter: {
        fontSize: 24,
        fontWeight: "bold",
    }
});
