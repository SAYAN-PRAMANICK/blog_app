import axios from "axios";
import { getAccessToken } from "../utils/common-utils";

const Backend_URL = "http://localhost:8000";

const getAxiosConfig = () => {
  return {
    headers: {
      authorization: getAccessToken(),
    },
  };
};

export const signupUser = (payload) => {
  return axios.post(`${Backend_URL}/signup`, payload);
};

export const loginUser = (payload) => {
  return axios.post(`${Backend_URL}/login`, payload);
};

export const uploadFile = (payload) => {
  return axios.post(`${Backend_URL}/file/Upload`, payload, getAxiosConfig());
};

export const uploadPost = (payload) => {
  return axios.post(`${Backend_URL}/post`, payload, getAxiosConfig());
};
