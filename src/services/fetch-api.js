import axios from 'axios';
import { updateRoomvip } from '../store/slices/viproomSlices';
import { useSelector, useDispatch } from 'react-redux';

const API = 'http://localhost/imrs/api-v2/admin';

export async function Allpending(reqData) {
  try {
    const res = await axios.post(+'/allpending', reqData);
    return res;
  } catch (error) {
    return { state: true, msg: 'Some thing went wong' };
  }
}

function getAxiosConfig() {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  return config;
}

export async function fetchLogin(reqData) {
  try {
    const { data } = await axios.post(API + '/check-login', reqData);

    if (data.state) {
      window.localStorage.setItem('username', reqData.Username);
      window.localStorage.setItem('isLoggedIn', true);
      window.localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export function fetchLogout() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(true);
        delete window.localStorage.token;
        delete window.localStorage.isLoggedIn;
        delete window.localStorage.username;

        // dispatch(updateRoomvip([]));
      }, 0);
    } catch (error) {
      reject(error);
    }
  });
}

export async function fetchroomvipinfo() {
  if (!Boolean(window.localStorage.isLoggedIn)) return;
  try {
    const { data } = await axios.get(API + '/get-books-vip', getAxiosConfig());
    return data;
  } catch (error) {
    console.log(error);
  }
}
