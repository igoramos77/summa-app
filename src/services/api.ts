import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import baseURL from './baseURL';

/* async function _getStorageValue() {
  const token = await AsyncStorage.getItem('@summa:user');
  console.log('AQUI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', token)
}

_getStorageValue()
 */
const api = axios.create({
  baseURL: baseURL,
});

export default api;