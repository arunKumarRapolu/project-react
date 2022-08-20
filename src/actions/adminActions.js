import { constants } from '../constants/allConstants.js';
import { adminService } from '../services/adminServices';
import { history } from '../helpers/history';
import {ToastsStore} from 'react-toasts';

export const adminActions = {
    addDoctor,
    getAllProducts,
    getProductDetails,
    saveProductDetails,
    delteProduct,
    getAllDoctors,
    delteDoctor,
    saveDoctorDetails,
    getDoctorDetails,
    getAllOrders
};

function addDoctor(data){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.addDoctor(data)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return msg;
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getAllProducts(user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.getAllProducts(user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'success',
                        products:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getProductDetails(product_id,user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.getProductDetails(product_id,user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'success',
                        product:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function saveProductDetails(product,user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.saveProductDetails(product,user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return msg
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function delteProduct(id,user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.delteProduct(id,user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    return {
                        type:'success',
                        products:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getAllDoctors(user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.getAllDoctors(user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'success',
                        doctors:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getDoctorDetails(doctor_id,user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.getDoctorDetails(doctor_id,user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'success',
                        doctor:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function saveDoctorDetails(doctor,user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.saveDoctorDetails(doctor,user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return msg
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function delteDoctor(id,user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.delteDoctor(id,user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    return {
                        type:'success',
                        doctors:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getAllOrders(user_id){
    return async dispatch => {
        dispatch(startLoader());
        return await adminService.getAllOrders(user_id)
            .then(
                msg => { 
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'success',
                        orders:msg
                    }
                },
                error => {
                    dispatch(stopLoader());
                    window.scroll(0,0);
                    return {
                        type:'error',
                        message:error
                    };
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}