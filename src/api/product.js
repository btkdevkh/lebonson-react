import axios from 'axios';
import { config } from '../config';

export const getAllProducts = async () => {
  const res = await axios.get(`${config.api_url}/api/v1/product/all`)
  return res.data
}

export const getOneProduct = async (id) => {
  const res = await axios.get(`${config.api_url}/api/v1/product/${id}`)
  return res.data
}

export const getProductsByOrderId = async (id) => {
  const res = await axios.get(`${config.api_url}/api/v1/product/order/${id}`)
  return res.data
}

export const updateOneProduct = async(data, id) => {
  const token = window.localStorage.getItem("lebonson-token");
  const res = await axios.put(`${config.api_url}/api/v1/product/update/${id}`, data, {
    headers: { "x-access-token": token }
  })
  return res.data
}

export const deleteOneProduct = async (id) => {
  const token = window.localStorage.getItem("lebonson-token");
  const res = await axios.delete(`${config.api_url}/api/v1/product/delete/${id}`, {
    headers: { "x-access-token": token }
  })
  return res.data
}

export const saveProduct = async (data) => {
  const token = window.localStorage.getItem("lebonson-token");
  const res = await axios.post(config.api_url+"/api/v1/product/create", data, {
    headers: { "x-access-token": token }
  })
  return res.data
}

export const saveImage = (file) => {
  let formData = new FormData();
  formData.append('image', file);

  return axios({
    method: "POST",
    url: config.api_url+"/api/v1/product/image",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then(res => {
    return res.data;
  })
}
