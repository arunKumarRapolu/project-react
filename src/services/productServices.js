import {apiUrl} from '../url/apiUrl';

export const productService = {
    addProduct,
    getProducts,
    getProductDetails
};

function addProduct(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/product/addProduct`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getProducts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${apiUrl.url}/product/getProducts`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getProductDetails(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    };

    return fetch(`${apiUrl.url}/product/getProductDetails`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
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