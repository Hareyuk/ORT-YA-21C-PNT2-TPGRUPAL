import { Link, Slot } from 'expo-router';
import Header from '../src/components/header';
import Footer from '../src/components/footer';

export default function Layout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}