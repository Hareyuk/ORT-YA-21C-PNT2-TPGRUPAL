import { View, Text } from "react-native";
import EditProfile from "../src/components/editProfile/editProfile";


export default function EditProfileView() {
  return (
    <View >
      <EditProfile navigation={navigation}/>
    </View>
  );
}