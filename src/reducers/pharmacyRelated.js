import { constants } from '../constants/allConstants';

export function pharmacyRelated(state = {
  selectedList:[]
}, action) {
  switch (action.type) {
    case constants.SAVE_PHARMACY_SELECTED_LIST:
      return { selectedList: action.list };
    default:
      return state
  }
}