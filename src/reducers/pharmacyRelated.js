import { constants } from '../constants/allConstants';

export function pharmacyRelated(state = {
  selectedList:[],
  prescriptionFile:null,
  fromCart:null
}, action) {
  switch (action.type) {
    case constants.SAVE_PHARMACY_SELECTED_LIST:
      return { 
        ...state,
        selectedList: action.list,
        fromCart: action.fromCart
      };
    case constants.GET_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        prescriptionFile:action.data
      }
    default:
      return state
  }
}