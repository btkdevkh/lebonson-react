import { config } from '../config';
import axios from 'axios';

export const checkToken = async() => {
  const token = window.localStorage.getItem('lebonson-token');

  const res = await axios.get(config.api_url+"/api/v1/auth/checkToken", { headers: { 'x-access-token': token } });
  // console.log(res);
  return res.data;
}

export const checkPasswordToken = async() => {
  const token = window.localStorage.getItem('password-token');

  const res = await axios.get(config.api_url+"/api/v1/auth/checkPasswordToken", { headers: { 'x-access-token': token } });
  // console.log(res);
  return res.data;
}
