import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e', // Fondo oscuro
    justifyContent: 'space-between',
  },
  header: {
    padding: 20,
    backgroundColor: '#3c3c3c',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginRight: 20,
    backgroundColor: '#ccc', // solo como placeholder
  },
  textContainer: {
    flex: 1,
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  footer: {
    padding: 15,
    backgroundColor: '#3c3c3c',
    alignItems: 'center',
  },

  contentWrapper: {
  flexDirection: 'row',
  flexWrap: 'wrap', // permite que en pantallas chicas se apile
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 900,
  width: '100%',
  gap: 40,
},


});
