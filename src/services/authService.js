import { post} from './backend'

export async function signUp(user) {
  try {
    const data = await post('/users/signup', user);
    return data;

  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function logIn(user) {

  try {
    const data = await post('/users/login', user);
    return data;

  } catch (err) {
    console.log(err);
    return err;
  }
}
