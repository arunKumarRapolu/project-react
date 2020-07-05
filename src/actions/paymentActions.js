import { constants } from '../constants/allConstants.js';
import { paymentService } from '../services/paymentServices';
import { history } from '../helpers/history';
import {ToastsStore} from 'react-toasts';

export const paymentActions = {
    payment,
    saveTransaction
};

function payment(data) {
    return dispatch => {
       // dispatch(request({ userId }));

        paymentService.payment(data)
            // .then(
            //     user => { 
            //         dispatch(success(user));
            //         //history.push('/');
            //         ToastsStore.success("Logged In successfully!");
            //         toggle(14)();
            //     },
            //     error => {
            //         dispatch(failure(error.toString()));
            //     }
            // );
    };

    function request(user) { return { type: constants.PAYMENT_REQUEST, user } }
    // function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function saveTransaction(data) {
    return dispatch => {
        dispatch(startLoader());
        return paymentService.saveTransaction(data)
            .then(
                user => {
                    dispatch(success(user));
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
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}