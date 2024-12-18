import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

export const get = async (route) => {
  try {

    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(SERVER_URL + route, authHeader);

    return data;

  } catch (err) {
    console.log(err);
    return err;
  }
}

export const post = async (route, body) => {

  try {

    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  
    const { data } = await axios.post(SERVER_URL + route, body, authHeader);
  
    return data
    
  } catch(err) {
    console.log(err)
    return err
  }

}

export const put = async (route, body) => {

  try {

    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  
    const { data } = await axios.put(SERVER_URL + route, body, authHeader);
  
    return data

  } catch(err) {
    console.log(err)
    return err
  }

}

export const axiosDelete = async (route) => {

  try {
    
    let token = localStorage.getItem("userToken");
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  
    const { data } = await axios.delete(SERVER_URL + route, authHeader);
  
    return data;

  } catch(err) {
    console.log(err)
    return err
  }

}
