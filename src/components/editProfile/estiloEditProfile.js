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
  pfpSelectionContainer: {
  marginTop: 20,
  marginBottom: 10,
  width: '100%', // Asegura que ocupe todo el ancho disponible
},
pfpOptionsScroll: {
  // Puedes ajustar la altura máxima si tienes muchas opciones
},
pfpOption: {
  borderWidth: 2,
  borderColor: '#ccc',
  borderRadius: 50, // Hace que sea circular
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
label: { // Si no lo tienes, puedes agregarlo para el texto "Cambiar Imagen de Perfil"
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
// Asegúrate de que estilos.avatar tenga sus dimensiones y borderRadius para ser circular
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  alignSelf: 'center', // Para centrarla en el contenedor
  marginBottom: 20,
},
});
