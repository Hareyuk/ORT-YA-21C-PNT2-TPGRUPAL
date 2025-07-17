import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    height: "100%",           
    backgroundColor: "#fff",
    flex: 1,
  },
  left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  right: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  titulo: { fontSize: 20, marginBottom: 12 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#3a2a23",
    marginBottom: 12,
  },
  infoText: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  boton: {
    backgroundColor: "#3a2a23",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  textoBoton: { color: "#fff", fontWeight: "bold" },
  placeholder: {
    width: width * 0.4,
    height: width * 0.4,
    opacity: 0.5,
    resizeMode: "contain",
  },
  decorationBg:
  {
    objectFit: "contain",
    width: "100%", 
    height: "100%",
    overflow: "hidden"
  }
});
