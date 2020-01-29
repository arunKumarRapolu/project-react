import { constants } from '../constants/allConstants';

export function registration(state = {}, action) {
  switch (action.type) {
    case constants.REGISTER_REQUEST:
      return { registering: true };
    case constants.REGISTER_SUCCESS:
      return {};
    case constants.REGISTER_FAILURE:
      return {signUperror : action.error};
    case constants.CLEAR_SIGNUP_ERRORS:
      return {signUperror : null};
    default:
      return state
  }
}