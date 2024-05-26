
import { deleteSession } from '../localSession/authSession';
import { removeLocalStorage } from '../localSession/userLocaldata';

export const logoutUser=()=> {
    deleteSession('user_data');
    deleteSession('access_token');
    deleteSession('userId');
    removeLocalStorage('user_Profile_data');

  }