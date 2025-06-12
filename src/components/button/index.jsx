import { Link } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ children, cb }) => {
  return (
    <Pressable style={[styles.generalButton]} onPress={cb}>
        <ImageBackground source={require('../../../assets/img/ui_button.png')} style={styles.img_ui}>       
            <Text style={[styles.txtButton]}>{children}</Text>
        </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  generalButton:
  {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 32,
    aspectRatio: "4.19/1",
    textAlign: "center",
    justifyContent: "center",
    width: "250px",
    paddingHorizontal: 0,
    paddingVertical: 0,
    cursor: "pointer"
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
    fontSize: 19,
    textAlign: "center",
  },
  smaller:
  {
    width: "200px",
    fontSize: 14
  }
});

export default Button;
