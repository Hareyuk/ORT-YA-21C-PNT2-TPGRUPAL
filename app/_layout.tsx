import { Link, Slot } from 'expo-router';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import { StyleSheet, View, SafeAreaView } from 'react-native';
export default function Layout() {
  return (
    <>
    <SafeAreaView style={{flexDirection: 'column-reverse', flex: 1}}>
      <Footer />
      <Slot />
      <Header />
    </SafeAreaView>
    </>
  );
}