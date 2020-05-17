import {apiUrl} from '../url/apiUrl';

export const paymentService = {
    payment
};

function payment(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/payment/request`, requestOptions).then(handleResponse)
    .then(res =>{
        console.log(res);
        window.location.href = res;
    })
    .catch((err) => console.log(err));
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