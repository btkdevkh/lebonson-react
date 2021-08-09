import { config } from '../config';
import axios from 'axios';

export const logInUser = async (data) => {
  const response = await axios.post(config.api_url+"/api/v1/user/login", data);
  return response.data;
}

export const getOneUser = async (id) => {
  const response = await axios.get(config.api_url+"/api/v1/user/"+id);
  return response.data;
}

export const getAllUsers = async () => {
  const token = window.localStorage.getItem("lebonson-token");
  const response = await axios.get(config.api_url+"/api/v1/user/all", {
    headers: { "x-access-token": token }
  });
  return response.data;
}

export const createUser = async (data) => {
  const response = await axios.post(config.api_url+"/api/v1/user/create", data);
  return response.data;
}

export const updateOneUser = async (data, id) => {
  const token = window.localStorage.getItem("lebonson-token");
  const response = await axios.put(config.api_url+"/api/v1/user/update/"+id, data, {
    headers: { "x-access-token": token }
  })
  return response.data;
}

export const updateOneUserRole = async (id, data) => {
  const token = window.localStorage.getItem("lebonson-token");
  const response = await axios.put(config.api_url+"/api/v1/user/update/role/"+id, data, {
    headers: { "x-access-token": token }
  })
  return response.data;
}

export const updateOneUserPassword = async (id, data) => {
  const token = window.localStorage.getItem("password-token");
  const response = await axios.put(config.api_url+"/api/v1/user/reset_end_step/"+id, data, {
    headers: { "x-access-token": token }
  })
  return response.data;
}

export const forgotUserPassword = async (data) => {
  const response = await axios.post(config.api_url+"/api/v1/user/reset_step_one", data);
  return response.data;
}
