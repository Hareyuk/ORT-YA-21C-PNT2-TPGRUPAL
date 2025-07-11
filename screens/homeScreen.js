import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import Button from "../src/components/button";
import { withTheme } from "styled-components";
import { useTokenUser } from "../hooks/hookToken";
import { useNavigation } from "@react-navigation/native";
import BigCardPreview from '../src/components/bigCardPreview'
import SmallCardPreview from '../src/components/smallCardPreview'
export default function Home() {

    const navigation = useNavigation();
    const handleNavigation = (route) => {
        navigation.navigate(route);
    };

    const { userData } = useTokenUser();

  const cardPreviews = [
  {
    id:"1",
    text: "Piedra",
    src: require("../assets/img/card_preview_1.jpg")
  },
  {
    id:"2",
    text: "Tijeras",
    src: require("../assets/img/card_preview_2.jpg")
  },
  {
    id:"3",
    text: "Papel",
    src: require("../assets/img/card_preview_3.jpg")
  }]; 
  
  const imageCardsArray = [
  { id: 'cd01', src: require('../assets/img/cardsgame/0.png') },
  { id: 'cd02', src: require('../assets/img/cardsgame/1.png') },
  { id: 'cd03', src: require('../assets/img/cardsgame/2.png') },
  { id: 'cd04', src: require('../assets/img/cardsgame/3.png') },
  { id: 'cd05', src: require('../assets/img/cardsgame/4.png') },
  { id: 'cd06', src: require('../assets/img/cardsgame/5.png') },
  { id: 'cd07', src: require('../assets/img/cardsgame/6.png') },
  { id: 'cd08', src: require('../assets/img/cardsgame/7.png') },
  { id: 'cd09', src: require('../assets/img/cardsgame/8.png') },
  { id: 'cd10', src: require('../assets/img/cardsgame/9.png') },
  { id: 'cd11', src: require('../assets/img/cardsgame/10.png') },
  { id: 'cd12', src: require('../assets/img/cardsgame/11.png') },
  { id: 'cd13', src: require('../assets/img/cardsgame/12.png') },
  { id: 'cd14', src: require('../assets/img/cardsgame/13.png') },
  { id: 'cd15', src: require('../assets/img/cardsgame/14.png') },
  { id: 'cd16', src: require('../assets/img/cardsgame/15.png') },
  { id: 'cd17', src: require('../assets/img/cardsgame/16.png') },
  { id: 'cd18', src: require('../assets/img/cardsgame/17.png') },
];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.main} centerContent={true} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.landingGameContainer}>
          <ImageBackground source={require('../assets/img/landing.jpg')} style={styles.landingGameBg}>
            <View style={styles.landingContainerBtns}>
              {
                userData
                ?
                <>
                  <Button cb={()=>handleNavigation('Lobby')} texto="Ingresar al lobby"/>
                </>
                :
                <>
                  <Button cb={()=>handleNavigation('SignUp')} texto="Registrarse"/>
                  <Button texto="Iniciar sesión" cb={()=>handleNavigation('Login')}/>
                </>
              }
            </View>
          </ImageBackground>
        </View>
        <View style={styles.sectionCards}>
          <View style={styles.containerPvCards}>
            {cardPreviews.map(
              (item)=>
                <BigCardPreview key={item.id} text={item.text} src={item.src}/>
              )}
          </View>
          <View style={styles.containerPvText}>
            <Text style={styles.title}>Desafía tu estrategia en el duelo definitivo de cartas</Text>
            <Text style={styles.subtitle}>Bienvenido a un nuevo giro del clásico piedra, papel y tijera. En este juego de cartas, cada batalla es una prueba de astucia y planificación. Elige tu equipo, coloca tus cartas en orden y domina las zonas elementales para potenciar tu victoria. ¿Podrás anticiparte a tu oponente y ganar el duelo final? ¡Demuestra tu habilidad ahora!</Text>
          </View>
        </View>
        <View style={styles.sectionGalleryCards}>
          <View style={styles.containerPvCardsGame}>
            {imageCardsArray.map(
              (item)=>
                <SmallCardPreview key={`cg${item.id}`} src={item.src}/>
              )}
          </View>
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
  sectionGalleryCards:
  {
    display: "flex",
    padding: 20,
    backgroundColor: "#130e0c",
    width: "100%",
    maxWidth: "1920px"
  },
  containerPvCardsGame:
  {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 12
  }
});
