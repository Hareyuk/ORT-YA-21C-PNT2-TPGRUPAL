import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import Button from "../src/components/button";
import { withTheme } from "styled-components";

export default function Page() {
  const cardPreviews = [{
    text: "piedra",
    src: require("../assets/img/card_preview_1.jpg")
  },
  {
    text: "tijeras",
    src: require("../assets/img/card_preview_2.jpg")
  },
  {
    text: "papel",
    src: require("../assets/img/card_preview_3.jpg")
  }];

  const previewCardHTML = (text, src)=>{
    return(
    <View style={styles.containerCardPreview}>
        <Image
          style={styles.cardPreview}
          source={src}
        />
        <Text style={styles.cardPreviewText}>{text}</Text>
      </View>
      );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.main} centerContent={true} contentContainerStyle={{ flexGrow: 1 }}>
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
        <View style={styles.sectionCards}>
          <View style={styles.containerPvCards}>
            {cardPreviews.map((item)=>previewCardHTML(item.text, item.src))}
          </View>
          <View style={styles.containerPvText}>
            <Text style={styles.title}>Desafía tu estrategia en el duelo definitivo de cartas</Text>
            <Text style={styles.subtitle}>Bienvenido a un nuevo giro del clásico piedra, papel y tijera. En este juego de cartas, cada batalla es una prueba de astucia y planificación. Elige tu equipo, coloca tus cartas en orden y domina las zonas elementales para potenciar tu victoria. ¿Podrás anticiparte a tu oponente y ganar el duelo final? ¡Demuestra tu habilidad ahora!</Text>
          </View>
        </View>
        <View style={styles.sectionGalleryCards}>
          Las 10 cartas
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
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
  },
  sectionCards:
  {
    backgroundColor: "#130e0c",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: "2em",
    alignItems: "center",
  },
  title:
  {
    color: "#fae99e",
    fontSize: "1.8em",
  },
  subtitle:
  {
    color: "#fff",
    fontSize: "1.2em"
  },
  containerPvCards:
  {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",

  },
  containerPvText:
  {
    width: "40%"
  },
  containerCardPreview:
  {
    width: "25%",
    display: "flex",
    flexDirection: "column",
  },
  cardPreview:
  {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    maxWidth: "100%",
    aspectRatio: "0.75/1",
  },
  cardPreviewText:
  {
    color: "#fff",
    textAlign: "center",
    fontSize: "1.4em",
    marginVertical: "1em"
  }
});
