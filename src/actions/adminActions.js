import { constants } from '../constants/allConstants.js';
import { adminService } from '../services/adminServices';
import { history } from '../helpers/history';
import {ToastsStore} from 'react-toasts';

export const adminActions = {
    addDoctor
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