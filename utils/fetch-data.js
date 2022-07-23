import axios from './axios';
import 'regenerator-runtime/runtime.js';

export const fetchData = async () => {
  return await axios.get('https://api.ratesapi.io/api/latest')
}

export default fetchData;
