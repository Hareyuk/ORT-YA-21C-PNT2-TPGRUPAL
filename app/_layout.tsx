import { Link, Slot } from 'expo-router';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import { UserLoggedStatusProvider } from '../hooks/userLogged';
import { StyleSheet, View, SafeAreaView } from 'react-native';
export default function Layout() {
  return (
    <UserLoggedStatusProvider>
      <SafeAreaView style={{flexDirection: 'column-reverse', flex: 1}}>
        <Footer />
        <Slot />
        <Header />
      </SafeAreaView>
    </UserLoggedStatusProvider>
  );
}