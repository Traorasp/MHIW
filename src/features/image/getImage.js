/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const useGetImage = (imageId, token) => axios({
  url: `http://localhost:3000/image/${imageId}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  method: 'GET',
  responseType: 'blob',
});
