import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApiHooksProvider } from './hooks/apiHooks';
import { UserLoggedStatusProvider } from './hooks/userLogged';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import Header from './src/components/header';
import Footer from './src/components/footer';
import Home from './screens/homeScreen';
import LoginView from './screens/loginScreen';
import SignUpView from './screens/signupScreen';
import AboutView from './screens/aboutScreen';
import EditProfileView from './screens/editProfileScreen';
import GameView from './screens/gameScreen';
import LobbyView from './screens/lobbyScreen';
import ProfileView from './screens/profileScreen';
import { NotificadorProvider } from './src/context/NotificadorContext'; // ⬅️ NUEVO IMPORT
import { UserTokenProvider } from './hooks/hookToken';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const isWeb = !Constants.platform;
  const isAndroid = !!Constants.platform?.android;
  const isIOS = !!Constants.platform?.ios;
  console.log('isWeb', isWeb);
  console.log('isAndroid', isAndroid);
  console.log('isIOS', isIOS);

  
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        contentStyle: isWeb ? styles.webContent : null
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Lobby" component={LobbyView} />
      <Stack.Screen name="Game" component={GameView} />
      <Stack.Screen name="Profile" component={ProfileView} />
      <Stack.Screen name="EditProfile" component={EditProfileView} />
      <Stack.Screen name="About" component={AboutView} />
    </Stack.Navigator>
  );
}

export default function App() {
  const isWeb = !Constants.platform;
  const isAndroid = !!Constants.platform?.android;
  const isIOS = !!Constants.platform?.ios;
  const cssStyleWeb = isWeb ? styles.webContainer : null;

  return (
    <SafeAreaProvider>
      <UserTokenProvider>
      <ApiHooksProvider>
        <UserLoggedStatusProvider>
          <NotificadorProvider> {/* ⬅️ NUEVO ENVOLTORIO */}
            <NavigationContainer>
              <SafeAreaView style={[styles.container, cssStyleWeb]}>
                <Footer />
                <StackNavigation />
                <Header />
              </SafeAreaView>
            </NavigationContainer>
          </NotificadorProvider>
        </UserLoggedStatusProvider>
      </ApiHooksProvider>
      </UserTokenProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column-reverse"
  },
  webContainer: {
    width: '100%',
    maxWidth: '100%',
    alignItems: 'stretch',
  },
  webContent: {
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
  }
});
