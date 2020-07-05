import { constants } from '../constants/allConstants.js';
import { doctorService } from '../services/doctorServices';
import { history } from '../helpers/history';
import {ToastsStore} from 'react-toasts';

export const doctorActions = {
    getDoctors
};

function getDoctors(){
    return dispatch => {
        dispatch(startLoader());
        dispatch(getDoctorsRequest());
        doctorService.getDoctors()
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
    function getDoctorsRequest(){ return {type: constants.GET_DOCTORS_REQUEST } }
    function success(data) { return { type: constants.GET_DOCTORS_SUCCESS, data } }
    function failure(error) { return { type: constants.GET_DOCTORS_FAILURE, error } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}
}