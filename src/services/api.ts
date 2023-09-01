import {JUNHO_API_URL} from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: JUNHO_API_URL,
});

export const mapFileType = (fileName: string) => {
  const extension = fileName.split('.').at(-1);
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return {type: 'image', name: fileName} as const;
    case 'mp4':
    case 'mov':
      return {type: 'video', name: fileName} as const;
    default:
      return {type: 'not-supported', name: fileName} as const;
  }
};
