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

export const getAllPosts = (payload) => {
  return axios.post(`${Backend_URL}/getPosts`, payload, getAxiosConfig());
};

export const getPostById = (id) => {
  return axios.get(`${Backend_URL}/getPostById/${id}`, getAxiosConfig());
};

export const updatePostById = (payload) => {
  return axios.post(`${Backend_URL}/updatePostById`, payload, getAxiosConfig());
};

export const deletePostById = (id) => {
  return axios.delete(`${Backend_URL}/deletePostById/${id}`, getAxiosConfig());
};

export const uploadComment = (payload) => {
  return axios.post(`${Backend_URL}/uploadComment`, payload, getAxiosConfig());
};

export const getAllComments = (id) => {
  return axios.get(`${Backend_URL}/getAllComments/${id}`, getAxiosConfig());
};

export const deleteCommentById = (id) => {
  return axios.get(`${Backend_URL}/deleteCommentById/${id}`, getAxiosConfig());
};
