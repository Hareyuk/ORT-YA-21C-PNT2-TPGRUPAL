import { StyleSheet, View, Image } from "react-native";

const SmallCardPreview = ({src, id}) => {
  return (
    <View style={styles.containerCardGamePreview} key={`cg${id}`}>
      <Image
        style={styles.cardGamePreview}
        source={src}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardGamePreview:
  {
    display: "flex",
    width: "10%",
    height: "auto",
  },
  cardGamePreview:
  {
    width: "100%",
    aspectRatio: 4/5,
    height: "auto",
  }
});

export default SmallCardPreview;
