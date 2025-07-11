import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function LoadingScreen(props) {
    const { text, isLoading } = props;

    if(!isLoading) return null;

    return (
        <View style={styles.wrapperLoading}>
            <View style={styles.loading}>
                <Image source={require('../../../assets/img/loading.gif')}></Image>
                <Text style={styles.textLoading}>{text}</Text>
            </View>
        </View>
    );
}