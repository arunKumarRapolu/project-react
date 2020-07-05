import { constants } from '../constants/allConstants';

const initialState = {
  appointmentDoctor:{}
}

export function bookingRelated(state = initialState, action) {
  switch (action.type) {
    case constants.APPOINTMENT_DOCTOR_ID:
      return { 
        ...state,
        appointmentDoctor: action.data
      };
    default:
      return state
  }
}