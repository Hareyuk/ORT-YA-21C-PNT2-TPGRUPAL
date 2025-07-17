import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
contenedor: {
alignItems: "center",
backgroundColor: "#fff",
height: "100%",
width: "100%",
flex: 1,
},
encabezado: {
alignItems: "center",
marginBottom: 10,
marginTop: 20
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
pfpOptionsContainer: {
  flexDirection: 'row',
  marginTop: 10,
  marginBottom: 15,
},
pfpOption: {
  borderWidth: 2,
  borderColor: '#ccc',
  borderRadius: 50, // Lo hace circular si la imagen es cuadrada
  padding: 5,
  marginHorizontal: 5,
},
selectedPfpOption: {
  borderColor: '#007AFF', // Color de resaltado para la imagen seleccionada
  borderWidth: 3,
},
pfpImage: {
  width: 70, // Ajusta el tamaño según sea necesario
  height: 70, // Ajusta el tamaño según sea necesario
  borderRadius: 35, // La mitad del ancho/alto para una imagen circular
},
errorTexto: { // Asegúrate de tener este estilo para los mensajes de error
  color: 'red',
  fontSize: 12,
  marginTop: 5,
  marginBottom: 5,
},
botonDeshabilitado: { // Estilo para el botón deshabilitado
  backgroundColor: '#a0d4ff', // Color más claro para el estado deshabilitado
},
txtCentrado: { // Si no lo tienes, puedes agregarlo para el texto "Cambiar Imagen de Perfil"
  textAlign: "center"
},
});

export default estilos;