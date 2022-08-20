import {apiUrl} from '../url/apiUrl';

export const adminService = {
    addDoctor,
    getAllProducts,
    getProductDetails,
    saveProductDetails,
    delteProduct,
    getAllDoctors,
    delteDoctor,
    getDoctorDetails,
    saveDoctorDetails,
    getAllOrders
};

function addDoctor(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/admin/addDoctor`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getAllProducts(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };

    return fetch(`${apiUrl.url}/admin/getAllProducts`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getProductDetails(product_id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product_id,user_id})
    };

    return fetch(`${apiUrl.url}/admin/getProductDetails`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function saveProductDetails(product,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product,user_id})
    };

    return fetch(`${apiUrl.url}/admin/saveProductDetails`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function delteProduct(id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product_id:id,user_id})
    };

    return fetch(`${apiUrl.url}/admin/delteProduct`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getAllDoctors(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };

    return fetch(`${apiUrl.url}/admin/getAllDoctors`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getDoctorDetails(doctor_id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({doctor_id,user_id})
    };

    return fetch(`${apiUrl.url}/admin/getDoctorDetails`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function saveDoctorDetails(doctor,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({doctor,user_id})
    };

    return fetch(`${apiUrl.url}/admin/saveDoctorDetails`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function delteDoctor(id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({doctor_id:id,user_id})
    };

    return fetch(`${apiUrl.url}/admin/delteDoctor`, requestOptions)
    .then(handleResponse)
    .then(msg => {
        return msg;
    })
}

function getAllOrders(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };

    return fetch(`${apiUrl.url}/admin/getAllOrders`, requestOptions)
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