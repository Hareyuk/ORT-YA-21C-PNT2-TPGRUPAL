import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
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
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    maxWidth: 300,
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
});
