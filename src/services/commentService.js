import { get, post, put, axiosDelete } from "./backend";

export async function getComments(cpaId) {
    try {
      const data = await get(`/comments/${cpaId}`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  
  /* AUTHORIZATION REQUESTS */
  export async function postComment(comment) {
    try {

      const data = await post('/comments', comment);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  
  export async function updateComment(comment, id) {
    try {

      const data = await put(`comments/${id}`, comment);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  
  export async function deleteComment(id) {

    try {

      const data = await axiosDelete(`/comments/${id}`);
      return data;

    } catch (err) {

      console.log(err);
      return err;
      
    }
  }