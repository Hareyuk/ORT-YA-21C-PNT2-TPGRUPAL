import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    wrapperLoading:
    {
        backgroundColor: "rgba(22, 19, 18, 0.68)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "40",
    },
    loading:
    {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    textLoading:
    {
        color: "#fff",
        textAlign: "center",
        fontSize: 22,
    }

});
