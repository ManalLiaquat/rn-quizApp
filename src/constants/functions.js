import {store} from '../redux/store';

export const DISPATCH_TO_STORE = (type, payload) => {
  store.dispatch({type, payload});
};
