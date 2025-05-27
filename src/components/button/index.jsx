import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const Button = ({ href, customStyle, children, cb }) => {
  return (
    href != null 
    ?
    <Link href={href} style={customStyle != null ? customStyle : styles.generalButton}>
        <ImageBackground source={require('../../../assets/img/ui_button.png')} style={styles.img_ui}>       
            <Text style={styles.txtButton}>{children}</Text>
        </ImageBackground>
    </Link>
    :
    <View style={customStyle != null ? customStyle : styles.generalButton} onPress={cb}>
        <ImageBackground source={require('../../../assets/img/ui_button.png')} style={styles.img_ui}>       
            <Text style={styles.txtButton}>{children}</Text>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  generalButton:
  {
    backgroundColor: "transparent",
    paddingVertical: "1em",
    paddingHorizontal: "2em",
    aspectRatio: "4.19/1",
    textAlign: "center",
    justifyContent: "center",
    width: "250px",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  img_ui:
  {
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
  },
  txtButton:
  {
    fontWeight: "bold",
    fontSize: "1.2em",
    textAlign: "center",
  }
});

export default Button;
