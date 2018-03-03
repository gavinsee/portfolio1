import {AsyncStorage} from 'react-native';


export default async function save_to_cache(item, selectedValue) {
  for(let i=0;i<arguments.length;i++) {
  let i=0;
  while(i+1 <= arguments.length) {
    item = arguments[i];
    selectedValue = arguments[i+1];
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
    i = i+2;
  }
}

export async function save_to_cache_old(item, selectedValue) {
  try {
      await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
  }
}
