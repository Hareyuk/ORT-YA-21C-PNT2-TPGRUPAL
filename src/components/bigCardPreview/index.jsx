import { StyleSheet, Text, View, Image } from "react-native";

const BigCardPreview = ({id, text, src }) => {
  return (
    <View style={styles.containerCardPreview} key={id}>
        <Image
          style={styles.cardPreview}
          source={src}
        />
        <Text style={styles.cardPreviewText}>{text}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
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

export default BigCardPreview;
