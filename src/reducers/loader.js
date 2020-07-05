import { constants } from '../constants/allConstants';


const initialState = {
  loader: false
}

export function loader(state = initialState, action) {
  switch (action.type) {
    case constants.SHOW_LOADER:
      return {
        ...state,
        loader: true
      };
    case constants.HIDE_LOADER:
      return {
          ...state,
          loader: false
      };
    default:
      return state
  }
}