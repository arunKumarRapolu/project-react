import { constants } from '../constants/allConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case constants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case constants.LOGIN_FAILURE:
      return {
        loginerror: action.error
      };
    case constants.LOGOUT:
      return {
        loggedIn: false,
        user : null
      };
    case constants.CLEAR_LOGIN_ERRORS:
      return {
        loginerror:null
      }
    default:
      return state
  }
}