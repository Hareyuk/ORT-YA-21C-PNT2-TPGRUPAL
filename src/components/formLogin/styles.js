import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
contenedor: {
padding: 20,
paddingTop: 30,
alignItems: "center",
backgroundColor: "#fff",
height: "100%",
flex: 1,
},
encabezado: {
alignItems: "center",
marginBottom: 10,
},
logo: {
width: 100,
height: 100,
resizeMode: "contain",
marginBottom: 5,
},
tituloPrincipal: {
fontSize: 24,
fontWeight: "bold",
},
subtitulo: {
fontSize: 20,
marginBottom: 20,
},
input: {
width: "100%",
borderColor: "#ccc",
borderWidth: 1,
borderRadius: 8,
padding: 10,
marginBottom: 12,
},
boton: {
backgroundColor: "#3a2a23",
paddingVertical: 12,
paddingHorizontal: 20,
borderRadius: 8,
marginTop: 10,
marginBottom: 12,
},
textoBoton: {
color: "#fff",
fontWeight: "bold",
textAlign: "center",
},
link: {
color: "#007bff",
marginBottom: 20,
},
copyright: {
fontSize: 12,
color: "#888",
},
});

export default estilos;