import {apiUrl} from '../url/apiUrl';

export const uploadService = {
    upload,
    getPrescription
};

function upload(file, rawfile, auth){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({file,rawfile, auth})
    };
    return fetch(`${apiUrl.url}/prescription/upload`, requestOptions).then(handleResponse);
}

function getPrescription() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${apiUrl.url}/prescription/download`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
