import axios from 'axios';

export default axios.create({
  baseURL: 'http://3.139.42.82:8081',
  headers: {
    'Content-Type' : 'application/json',
  },
});