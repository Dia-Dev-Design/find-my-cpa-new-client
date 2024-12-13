import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

/* NON-AUTH REQUESTS */
export async function getComments(cpaId) {
  try {
    const { data } = await axios.get(`${SERVER_URL}/comments/${cpaId}`);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

/* AUTHENTICATION REQUESTS */
export async function signUp(user) {
  try {
    const { data } = await axios.post(`${SERVER_URL}/users/signup`, user);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function logIn(user) {
  try {
    const { data } = await axios.post(`${SERVER_URL}/users/login`, user);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

/* AUTHORIZATION REQUESTS */
export async function postComment(comment) {
  try {
    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: token } };
    const { data } = await axios.post(
      `${SERVER_URL}/comments`,
      comment,
      authHeader
    );
  } catch (err) {
    console.log(err);
    return err;
  }
  return data;
}

export async function updateComment(comment, id) {
  try {
    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: token } };
    const { data } = await axios.put(
      `${SERVER_URL}/comments/${id}`,
      comment,
      authHeader
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteComment(id) {
  try {
    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: token } };

    const { data } = await axios.delete(
      `${SERVER_URL}/comments/${id}`,
      authHeader
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
