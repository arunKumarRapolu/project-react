import { constants } from '../constants/allConstants.js';
import { userService } from '../services/userServices';
import { history } from '../helpers/history';
import {ToastsStore} from 'react-toasts';

export const userActions = {
    login,
    register,
    clearSignInErrors,
    clearSignUpErrors,
    logout,
    appointmentDoctor,
    saveSelectedList,
    addToCart,
    getUserDetails,
    getCartData,
    modifyCartData,
    removeFromCart,
    saveAddress,
    getAddress,
    saveProfileData,
    clearMyProfileApiError,
    editAddress,
    removeAddress,
    getMyOrders,
    saveLinkAfterLogin,
    submitContactUs,
    forgotPasswordOTP,
    forgotPwdChangePwd
};

function login(username, password,toggle) {
    
    return dispatch => {
        dispatch(startLoader());
        dispatch(loginRequest());
        return userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(stopLoader());
                    localStorage.setItem("auth",JSON.stringify(user))
                    ToastsStore.success("Logged In successfully!");
                    toggle(14)();
                    return 'success';
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                    return 'fail';
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function loginRequest(){ return {type: constants.LOGIN_REQUEST } }
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function register(user,toggle) {
    return dispatch => {
        dispatch(startLoader());
        dispatch(signupRequest());
        return userService.register(user)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(stopLoader());
                    localStorage.setItem("auth",JSON.stringify(user))
                    ToastsStore.success("Successfully Registered!");
                    toggle(14)();
                    return 'success';
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                    return 'fail';
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function signupRequest() { return { type: constants.REGISTER_REQUEST } }
    function success(user) { return { type: constants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: constants.REGISTER_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function clearSignInErrors(){
    return { type: constants.CLEAR_LOGIN_ERRORS} 
}

function clearSignUpErrors(){
    return { type: constants.CLEAR_SIGNUP_ERRORS} 
}
function logout(){
    return (dispatch) => {
        dispatch(signinLogout());
        dispatch(signupLogout());
    }
    function signinLogout() { return { type: constants.SIGNIN_LOGOUT}  }
    function signupLogout() { return { type: constants.SIGNUP_LOGOUT}  }
}
function appointmentDoctor(data){
    //history.push('/doctors/appointment');
    return { type: constants.APPOINTMENT_DOCTOR_ID,data};
}

function saveSelectedList(list, fromCart){
    return { type: constants.SAVE_PHARMACY_SELECTED_LIST, list, fromCart};
}

function addToCart(data){
    // var auth = JSON.parse(localStorage.getItem('auth'));
    // auth.cart.push(item.id);
    // localStorage.setItem('auth', JSON.stringify(auth))

    return dispatch => {
        dispatch(startLoader());
        userService.addToCart(data)
            .then(
                user => { 
                    dispatch(success(data.productId));
                    dispatch(stopLoader());
                    var auth = JSON.parse(localStorage.getItem('auth'));
                    auth.cart.push(data.productId);
                    localStorage.setItem('auth', JSON.stringify(auth));
                    ToastsStore.success("Product added to cart successfully");
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                }
            );
    };

    function startLoader(user) { return { type: constants.SHOW_LOADER } }
    function success(item) { return { type: constants.ADD_TO_CART_SUCCESS, item } }
    function failure(error) { return { type: constants.ADD_TO_CART_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getUserDetails(username, password){

    return dispatch => {
        dispatch(startLoader());
        dispatch(loginRequest());
        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(stopLoader());
                    localStorage.setItem("auth",JSON.stringify(user))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                    localStorage.removeItem('auth');
                }
            );
    };

    function startLoader(user) { return { type: constants.SHOW_LOADER } }
    function loginRequest(){ return {type: constants.LOGIN_REQUEST } }
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function getCartData(items){

    return dispatch => {
        dispatch(startLoader());
        dispatch(getCartRequest());
        userService.getCartData(items)
            .then(
                data => {
                    data.forEach(item => {
                        item.quantity = 1;
                        item.rupees = item.price;
                    })
                    dispatch(success(data));
                    dispatch(stopLoader());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                }
            );
    };

    function startLoader(user) { return { type: constants.SHOW_LOADER } }
    function getCartRequest(){ return {type: constants.GET_CART_REQUEST } }
    function success(data) { return { type: constants.GET_CART_SUCCESS, data } }
    function failure(error) { return { type: constants.GET_CART_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function modifyCartData(data) {
    return { type: constants.GET_CART_SUCCESS, data};
}

function removeFromCart(authData, removedId) {
    return dispatch => {
        dispatch(startLoader());
        return userService.removeFromCart(authData, removedId)
            .then(
                data => {
                    dispatch(success(authData));
                    dispatch(stopLoader());
                    localStorage.setItem('auth', JSON.stringify(authData));
                    return 'success';
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(stopLoader());
                    return 'fail';
                }
            );
    };

    function startLoader(user) { return { type: constants.SHOW_LOADER } }
    function success(data) { return { type: constants.REMOVE_CART_SUCCESS, data } }
    function failure(error) { return { type: constants.REMOVE_CART_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function saveAddress(data){

    return dispatch => {
        dispatch(startLoader());
        return userService.saveAddress(data)
            .then(
                res => {
                    ToastsStore.success("Address saved successfully");
                    dispatch(stopLoader());
                    dispatch(success(res));
                    return 'success';
                },
                error => {
                    ToastsStore.error("Address not saved. Try again!");
                    dispatch(stopLoader());
                    return 'fail';
                }
            );
    };

    function startLoader(user) { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
    function success(data) { return { type: constants.GET_ADDRESS_SUCCESS, data } }
}

function getAddress(id){
    return dispatch => {
        dispatch(startLoader());
        dispatch(getAddressRequest());
        userService.getAddress(id)
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
    function getAddressRequest(){ return {type: constants.GET_ADDRESS_REQUEST } }
    function success(data) { return { type: constants.GET_ADDRESS_SUCCESS, data } }
    function failure(error) { return { type: constants.GET_ADDRESS_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function saveProfileData(data){
    return dispatch => {
        dispatch(startLoader());
        dispatch(saveDataRequest());
        userService.saveProfileData(data)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(stopLoader());
                    localStorage.setItem("auth",JSON.stringify(user))
                    ToastsStore.success("Changes saved successfully!");
                },
                error => {
                    dispatch(failure(error));
                    dispatch(stopLoader());
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function saveDataRequest(){ return {type: constants.SAVE_PROFILE_DATA_REQUEST } }
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: constants.SAVE_PROFILE_DATA_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function clearMyProfileApiError() {
    return { type: constants.CLEAR_MYPROFILE_API_ERROR} 
}

function editAddress(data){
    return dispatch => {
        dispatch(startLoader());
        return userService.editAddress(data)
            .then(
                res => {
                    ToastsStore.success("Address changed successfully");
                    dispatch(stopLoader());
                    dispatch(success(res));
                    return 'success';
                },
                error => {
                    ToastsStore.error("Address not changed. Try again!");
                    dispatch(stopLoader());
                    return 'fail';
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
    function success(data) { return { type: constants.EDIT_ADDRESS_SUCCESS, data } }
}

function removeAddress(id, user_id){
    return dispatch => {
        dispatch(startLoader());
        userService.removeAddress(id, user_id)
        .then(
            res => {
                ToastsStore.success("Address removed successfully");
                dispatch(stopLoader());
                dispatch(success(res));
            },
            error => {
                ToastsStore.error("Address not removed. Try again!");
                dispatch(stopLoader());
            }
        );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
    function success(data) { return { type: constants.REMOVE_ADDRESS_SUCCESS, data } }
}

function getMyOrders(id){
    return dispatch => {
        dispatch(startLoader());
        dispatch(getMyOrderRequest());
        userService.getMyOrders(id)
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
    function getMyOrderRequest(){ return {type: constants.MY_ORDERS_REQUEST } }
    function success(data) { return { type: constants.MY_ORDERS_SUCCESS, data } }
    function failure(error) { return { type: constants.MY_ORDERS_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function saveLinkAfterLogin(link){
    return { type: constants.SAVE_LINK_AFTER_LOGIN, link} 
}

function submitContactUs(data){
    return dispatch => {
        dispatch(startLoader());
        return userService.submitContactUs(data)
            .then(
                data => {
                    dispatch(stopLoader());
                    return 'success';
                },
                error => {
                    dispatch(stopLoader());
                    return 'fail';
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}

function forgotPasswordOTP(num,resend){
    return dispatch => {
        dispatch(startLoader());
        return userService.forgotPasswordOTP(num,resend)
        .then(
            data => {
                dispatch(stopLoader());
                return data;
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

function forgotPwdChangePwd(otp,pwd,mobile){
    return dispatch => {
        dispatch(startLoader());
        return userService.forgotPwdChangePwd(otp,pwd,mobile)
        .then(
            data => {
                dispatch(stopLoader());
                return data;
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