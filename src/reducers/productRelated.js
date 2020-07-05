import { constants } from '../constants/allConstants';

const initialState = {
  successMsg: '',
  errMsg: '',
  products:[],
  getProductSuccess:'',
  getProductFail:'',
  productsCopy:[],
  productDetails:{}
}

export function productRelated(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        successMsg: '',
        errMsg: ''
      };
    case constants.ADD_PRODUCT_SUCCESS:
      return { 
        ...state,
        successMsg: action.msg.message,
        errMsg: ''
      };
    case constants.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        successMsg: '',
        errMsg:action.error
      };
    case constants.GET_PRODUCTS_REQUEST:
    return {
        ...state,
        products:[],
        productsCopy:[],
        getProductSuccess:'',
        getProductFail:''
    };
    case constants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products:action.data,
        productsCopy:action.data,
        getProductSuccess: 'success',
        getProductFail:''
    };
    case constants.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products:[],
        productsCopy:[],
        getProductSuccess:'',
        getProductFail:action.error
    };
    case constants.COMPANY_SEARCH:
        return {
            ...state,
            products:state.productsCopy.filter((product) => product.company.indexOf(action.search.company) >= 0 && product.type.indexOf(action.search.type) >= 0 && product.name.indexOf(action.search.name) >= 0)
    };
    case constants.GET_PRODUCT_DETAIL_REQUEST:
    return {
        ...state,
        productDetails:{}
    };
    case constants.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetails:action.data
    };
    case constants.GET_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        productDetails:{}
    };
    default:
      return state
  }
}