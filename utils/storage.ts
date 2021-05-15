import AsyncStorage from '@react-native-async-storage/async-storage';

async function setStorage(cname: string, cvalue: string, extime?: Date) {
  try {
    await AsyncStorage.setItem(cname, cvalue);
  } catch (e) {
    console.log(e);
  }
}

async function removeStorage(cname: string) {
  try {
    await AsyncStorage.removeItem(cname);
  } catch (e) {
    console.log(e);
  }
}

async function getStorage(cname: string) {
  try {
    const data = await AsyncStorage.getItem(cname);
    return data;
  } catch (e) {
    console.log(e);
  }
  return null;
}


export { setStorage, removeStorage, getStorage };