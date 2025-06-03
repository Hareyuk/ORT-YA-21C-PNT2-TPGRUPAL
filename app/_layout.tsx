import { Slot } from 'expo-router';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import { UserLoggedStatusProvider } from '../hooks/userLogged';
import { StyleSheet, View, SafeAreaView } from 'react-native';

export default function Layout() {
  return (
    <UserLoggedStatusProvider>
      <SafeAreaView style={styles.layout}>
        <Footer />
        <Slot />
        <Header />
      </SafeAreaView>
    </UserLoggedStatusProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#2e2e2e', 
  },
});
