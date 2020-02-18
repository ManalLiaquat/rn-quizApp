import {DISPATCH_TO_STORE} from '../../constants/functions';
import NavigationService from '../../NavigationService';
import {AUTH} from '../../constants/reduxTypeNames';
import {HOME, LOGIN} from '../../constants/routeNames';
import {store} from '../store';

export const login = (username, password) => {
  const user = {username, password};
  DISPATCH_TO_STORE(AUTH, user);
  NavigationService.navigate(HOME);
};

export const checkUser = () => {
  const {user} = store.getState().authReducers;
  if (user) {
    return user;
  } else {
    NavigationService.navigate(LOGIN);
    return null;
  }
};

export const logout = () => {
  DISPATCH_TO_STORE(AUTH, null);
  NavigationService.navigate(LOGIN);
};
