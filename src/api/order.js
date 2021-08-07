import axios from 'axios';
import { config } from '../config';

export const createOrderCart = async (order) => {
  const token = window.localStorage.getItem("lebonson-token");
  const res = await axios.post(config.api_url+"/api/v1/order/create", order, {
    headers: { "x-access-token": token }
  });
  return res.data;
}

export const getOrdersByUsertId = async (id) => {
  const token = window.localStorage.getItem("lebonson-token");
  const res = await axios.get(config.api_url+"/api/v1/order/user/"+id, {
    headers: { "x-access-token": token }
  });
  return res.data;
}

export const getOrderDetailsByOrderCartId = async (id) => {
  const token = window.localStorage.getItem("lebonson-token");
  const res = await axios.get(config.api_url+"/api/v1/order/detail/"+id, {
    headers: { "x-access-token": token }
  });
  return res.data;
}
