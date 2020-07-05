import { constants } from '../constants/allConstants.js';
import { uploadService } from '../services/uploadServices';
import { history } from '../helpers/history';

export const uploadActions = {
    upload,
    prescriptionFile
};

function upload(file, rawfile, auth){

    return async dispatch => {
        dispatch(startLoader());

       return await uploadService.upload(file, rawfile, auth)
            .then(
                data => { 
                    dispatch(stopLoader()); 
                    return 'success'
                },
                error => {
                    dispatch(stopLoader()); 
                    return 'fail'
                }
            );
    };

    function startLoader() { return { type: constants.SHOW_LOADER } }
    function stopLoader() { return {type: constants.HIDE_LOADER}}

}

function prescriptionFile(){
    return dispatch => {

        uploadService.getPrescription()
            .then(
                data => { 
                    dispatch(success(data));
                    
                },
                error => {

                }
            );
    };

    function success(data) { return { type: constants.GET_PRESCRIPTION_SUCCESS, data } }

}