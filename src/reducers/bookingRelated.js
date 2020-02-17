import { constants } from '../constants/allConstants';

export function bookingRelated(state = {}, action) {
  switch (action.type) {
    case constants.APPOINTMENT_DOCTOR_ID:
      return { appointmentDoctorId: action.id };
    default:
      return state
  }
}