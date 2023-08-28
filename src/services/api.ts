import {JUNHO_API_URL} from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: JUNHO_API_URL,
});
