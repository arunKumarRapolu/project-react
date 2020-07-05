import { constants } from '../constants/allConstants';

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};

const initialState = {
  auth:{},
  cartData:[],
  myAddresses:[],
  myInfo:{},
  myProfileApiError:null,
  myOders:[],
  linkAfterLogin:'/'
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        auth: {}
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.user
      };
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        loginerror: action.error,
        auth:{}
      };
    case constants.SIGNIN_LOGOUT:
      return {
        ...state,
        auth : {}
      };
    case constants.CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        loginerror:null
    }
    case constants.ADD_TO_CART_SUCCESS:
      if(Object.keys(state.auth).length > 0){
        var newAuth = state.auth;
        newAuth.cart.push(action.item)
      }
      return {
        ...state,
        auth: Object.keys(state.auth).length > 0 ? newAuth : {}
      };
    case constants.ADD_TO_CART_FAILURE:
      return {
        ...state,
        auth:state.auth
      };
    case constants.GET_CART_REQUEST:
      return {
        ...state,
        cartData:[]
      };
    case constants.GET_CART_SUCCESS:
      return {
        ...state,
        cartData: action.data
      };
    case constants.GET_CART_FAILURE:
      return {
        ...state,
        cartData:[]
      };
    case constants.REMOVE_CART_SUCCESS:
    return {
      ...state,
      auth:action.data
    };
    case constants.REMOVE_CART_FAILURE:
    return {
      ...state,
      auth:state.auth
    };
    case constants.GET_ADDRESS_REQUEST:
      return {
        ...state,
        myAddresses:[]
      };
    case constants.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        myAddresses: action.data
      };
    case constants.GET_ADDRESS_FAILURE:
      return {
        ...state,
        myAddresses:[]
      };
    case constants.SAVE_PROFILE_DATA_REQUEST:
      return {
        ...state,
        myProfileApiError:null
      };
    case constants.SAVE_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        myProfileApiError:null
      };
    case constants.SAVE_PROFILE_DATA_FAILURE:
      return {
        ...state,
        myProfileApiError:action.error
      };
    case constants.CLEAR_MYPROFILE_API_ERROR:
      return {
        ...state,
        myProfileApiError:null
      };
    case constants.EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        myAddresses: action.data
      };
    case constants.REMOVE_ADDRESS_SUCCESS:
      return {
        ...state,
        myAddresses: action.data
      };
    case constants.MY_ORDERS_REQUEST:
      return {
        ...state,
        myOders:[]
      };
    case constants.MY_ORDERS_SUCCESS:
      return {
        ...state,
        myOders:action.data
      };
    case constants.MY_ORDERS_FAILURE:
      return {
        ...state,
        myOders:[]
      };
    case constants.SAVE_LINK_AFTER_LOGIN:
    return {
      ...state,
      linkAfterLogin:action.link
    };
    default:
      return state
  }
}