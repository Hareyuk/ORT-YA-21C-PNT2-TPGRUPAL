import AsyncStorage from "@react-native-async-storage/async-storage";

const isObject = (value) => {
  return typeof value === 'object' && value !== null;
}

const storeData = async (key, value) => {
  try {
    if (isObject(value)) {
      const jsonValue = JSON.stringify(value);
      // @myData : "Hola"
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    console.log("Error al guardar el dato", error);
  }
}

const getData = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key).then(value=>{return value});
    //Decodificar JSON si es un objeto recibido
    if(typeof value === 'object')
    {
      value = JSON.parse(value);
    }
    return value ? value : null;
  } catch (error) {
    console.log("Error al obtener el dato", error);
  }
}

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error al eliminar el dato", error);
  }
}

const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Error al eliminar el dato", error);
  }
}


export default {
  storeData,
  getData,
  clearData,
  removeData
}