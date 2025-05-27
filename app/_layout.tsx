import { Link, Slot } from 'expo-router';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import { StyleSheet, View } from 'react-native';
export default function Layout() {
  return (
    <>
    <View style={{flexDirection: 'column-reverse'}}>
      <Footer />
        <Slot />
      <Header />
    </View>
    </>
  );
}