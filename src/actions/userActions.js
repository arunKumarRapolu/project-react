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
    appointmentDoctorId
};

function login(username, password,toggle) {
    console.log(username);
    console.log(password);
    console.log(toggle);
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    //history.push('/');
                    ToastsStore.success("Logged In successfully!");
                    toggle(14)();
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: constants.LOGIN_REQUEST, user } }
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function register(user,toggle) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    //history.push('/');
                    //dispatch(alertActions.success('Registration successful'));
                    ToastsStore.success("Successfully Registered!");
                    toggle(14)();
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: constants.REGISTER_REQUEST, user } }
    function success(user) { return { type: constants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: constants.REGISTER_FAILURE, error } }
}

function clearSignInErrors(){
    return { type: constants.CLEAR_LOGIN_ERRORS} 
}

function clearSignUpErrors(){
    return { type: constants.CLEAR_SIGNUP_ERRORS} 
}
function logout(){
    return { type: constants.LOGOUT} 
}
function appointmentDoctorId(id){
    //history.push('/doctors/appointment');
    return { type: constants.APPOINTMENT_DOCTOR_ID,id};
}