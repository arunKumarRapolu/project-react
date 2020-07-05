import { constants } from '../constants/allConstants';

const initialState = {
  doctorsList:[]
}

export function doctorRelated(state = initialState, action) {
  switch (action.type) {
    case constants.GET_DOCTORS_REQUEST:
      return {
        ...state,
        doctorsList:[]
      };
    case constants.GET_DOCTORS_SUCCESS:
      return {
        ...state,
        doctorsList: action.data
      };
    case constants.GET_DOCTORS_FAILURE:
      return {
        ...state,
        doctorsList:[]
      };
    default:
      return state
  }
}