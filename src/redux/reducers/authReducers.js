import {AUTH} from '../../constants/reduxTypeNames';

const initialState = {
  user: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTH:
      return {...state, user: payload};

    default:
      return state;
  }
};
