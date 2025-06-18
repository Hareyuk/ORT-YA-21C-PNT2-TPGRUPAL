import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import Button from "../src/components/button";
import { withTheme } from "styled-components";
import { useAuthUser } from "../hooks/userLogged";
import { useNavigation } from "@react-navigation/native";

export default function Home() {

    const navigation = useNavigation();
    const handleNavigation = (route) => {
        navigation.navigate(route);
    };

    const { isUserLogged } = useAuthUser();

  const cardPreviews = [{
    id:"1",
    text: "piedra",
    src: require("../assets/img/card_preview_1.jpg")
  },
  {
    id:"2",
    text: "tijeras",
    src: require("../assets/img/card_preview_2.jpg")
  },
  {
    id:"3",
    text: "papel",
    src: require("../assets/img/card_preview_3.jpg")
  }];
    
  const previewCardHTML = (id, text, src)=>{
    return(
    <View style={styles.containerCardPreview} key={id}>
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
              {
                isUserLogged
                ?
                <>
                  <Button cb={()=>handleNavigation('Lobby')}>
                    Ingresar al lobby
                  </Button>
                </>
                :
                <>
                  <Button cb={()=>handleNavigation('SignUp')}>
                    Registrarse
                  </Button>
                  <Button cb={()=>handleNavigation('Login')}>
                    Iniciar sesión
                  </Button>
                </>
              }
            </View>
          </ImageBackground>
        </View>
        <View style={styles.sectionCards}>
          <View style={styles.containerPvCards}>
            {cardPreviews.map((item)=>previewCardHTML(item.id, item.text, item.src))}
          </View>
          <View style={styles.containerPvText}>
            <Text style={styles.title}>Desafía tu estrategia en el duelo definitivo de cartas</Text>
            <Text style={styles.subtitle}>Bienvenido a un nuevo giro del clásico piedra, papel y tijera. En este juego de cartas, cada batalla es una prueba de astucia y planificación. Elige tu equipo, coloca tus cartas en orden y domina las zonas elementales para potenciar tu victoria. ¿Podrás anticiparte a tu oponente y ganar el duelo final? ¡Demuestra tu habilidad ahora!</Text>
          </View>
        </View>
        <View style={styles.sectionGalleryCards}>
          <Text>Las 10 cartas</Text>
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
    paddingBottom: 16,
  },
  w100:
  {
    width: '100%',
  },
  generalButton:
  {
    backgroundColor: "#f3eb9e",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  landingContainerBtns:
  {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
  },
  sectionCards:
  {
    backgroundColor: "#130e0c",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 32,
    alignItems: "center",
  },
  title:
  {
    color: "#fae99e",
    fontSize: 29,
  },
  subtitle:
  {
    color: "#fff",
    fontSize: 19
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
    fontSize: 22,
    marginVertical: 16
  }
});
