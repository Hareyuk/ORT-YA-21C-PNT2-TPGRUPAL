import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Link } from "expo-router";
import Button from "../src/components/button";

export default function Page() {
  const cardPreviews = [{
    text: "piedra",
    src: "./assets/img/card_preview_1.jpg"
  },
  {
    text: "tijeras",
    src: "./assets/img/card_preview_2.jpg"
  },
  {
    text: "papel",
    src: "./assets/img/card_preview_3.jpg"
  }];

  const previewCardHTML = (text, src)=>{
    return`
      <View>
        <Image
          style={styles.cardPreview}
          source={require('${src}')}
        />
        <Text style={styles.cardPreviewText}>${text}</Text>
      </View>
    `;
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.landingGameContainer}>
          <ImageBackground source={require('../assets/img/landing.jpg')} style={styles.landingGameBg}>
            <View style={styles.landingContainerBtns}>
              <Button href='/signup'>
                Registrarse
              </Button>
              <Button href='/login'>
                Iniciar sesión
              </Button>
              <Button href='/lobby'>
                Ingresar al lobby
              </Button>
            </View>
          </ImageBackground>
        </View>
        <View>
          <View>
          </View>
          <View>
            <Text style={styles.title}>Desafía tu estrategia en el duelo definitivo de cartas</Text>
            <Text style={styles.subtitle}>Bienvenido a un nuevo giro del clásico piedra, papel y tijera. En este juego de cartas, cada batalla es una prueba de astucia y planificación. Elige tu equipo, coloca tus cartas en orden y domina las zonas elementales para potenciar tu victoria. ¿Podrás anticiparte a tu oponente y ganar el duelo final? ¡Demuestra tu habilidad ahora!</Text>
          </View>
        </View>
        <View>
          Las 10 cartas
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 1920,
    marginHorizontal: "auto",
  },
  landingGameContainer:
  {
    height: 500,
    width: '100%',
    objectFit: 'contain',
  },
  landingGameBg:
  {
    objectFit: 'contain',
    height: '100%',
    justifyContent: "flex-end",
    paddingBottom: "1em",
  },
  w100:
  {
    width: '100%',
  },
  generalButton:
  {
    backgroundColor: "#f3eb9e",
    paddingVertical: "1em",
    paddingHorizontal: "2em",
  },
  landingContainerBtns:
  {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1em",
  }

});
