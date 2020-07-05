import { constants } from '../constants/allConstants';

const initialState = {
  auth:{},
  signUperror:null
}

export function registration(state = initialState, action) {
  switch (action.type) {
    case constants.REGISTER_REQUEST:
      return {
        ...state,
        auth: {} 
      };
    case constants.REGISTER_SUCCESS:
      return { 
        ...state,
        auth: action.user
      };
    case constants.REGISTER_FAILURE:
      return {
        ...state,
        signUperror : action.error,
        auth:{}
      };
    case constants.CLEAR_SIGNUP_ERRORS:
      return {
        ...state,
        signUperror : null
      };
    case constants.SIGNUP_LOGOUT:
      return {
        ...state,
        auth : {}
      };
    default:
      return state
  }
}