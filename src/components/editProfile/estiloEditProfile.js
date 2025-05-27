import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  left: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  right: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 20,
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#3a2a23",
    marginBottom: 20,
  },

  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },

  boton: {
    width: "70%",
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 12,
    alignItems: "center",
  },
  botonGuardar: {
    backgroundColor: "#3a2a23",
  },
  botonEliminar: {
    backgroundColor: "#555",
    marginTop: 8,
  },

  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  textoEliminar: {
    color: "#fff",
  },

  placeholder: {
    width: width * 0.5,
    aspectRatio: 1,
    resizeMode: "contain",
    opacity: 0.4,
  },
});
