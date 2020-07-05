import { constants } from '../constants/allConstants.js';
import { productService } from '../services/productServices';
import { history } from '../helpers/history';
import {ToastsStore} from 'react-toasts';

export const productActions = {
    addProduct,
    getProducts,
    serachProduct,
    getProductDetails
};

function addProduct(data){
    return async dispatch => {
        dispatch(startLoader());
        dispatch(addProductRequest());
        return await productService.addProduct(data)
            .then(
                msg => { 
                    dispatch(success(msg));
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return "success";
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return "fail";
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function addProductRequest() { return { type: constants.ADD_PRODUCT_REQUEST } }
    function success(msg) { return { type: constants.ADD_PRODUCT_SUCCESS, msg } }
    function failure(error) { return { type: constants.ADD_PRODUCT_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getProducts(){
    return dispatch => {
        dispatch(startLoader());
        dispatch(getProductsRequest());
        productService.getProducts()
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(stopLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function getProductsRequest() { return { type: constants.GET_PRODUCTS_REQUEST } }
    function success(data) { return { type: constants.GET_PRODUCTS_SUCCESS, data } }
    function failure(error) { return { type: constants.GET_PRODUCTS_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function serachProduct(company,type,name){
    const search = {company,type,name}
    return dispatch => {
        dispatch(startSearch(search))
    };

    function startSearch(search) { return { type: constants.COMPANY_SEARCH, search } }
}

function getProductDetails(id){
    return dispatch => {
        dispatch(startLoader());
        dispatch(getProductDetialRequest());
        productService.getProductDetails(id)
            .then(
                data => { 
                    dispatch(success(data[0]));
                    dispatch(stopLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function getProductDetialRequest() { return { type: constants.GET_PRODUCT_DETAIL_REQUEST } }
    function success(data) { return { type: constants.GET_PRODUCT_DETAIL_SUCCESS, data } }
    function failure(error) { return { type: constants.GET_PRODUCT_DETAIL_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}