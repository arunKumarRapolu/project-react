import {apiUrl} from '../url/apiUrl';

export const userService = {
    login,
    register,
    addToCart,
    getCartData,
    removeFromCart,
    saveAddress,
    getAddress,
    saveProfileData,
    editAddress,
    removeAddress,
    getMyOrders,
    submitContactUs,
    forgotPasswordOTP,
    forgotPwdChangePwd
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiUrl.url}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl.url}/users/register`, requestOptions)
    .then(handleResponse)
    .then(user => {
        return user;
    });
}

function addToCart(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(`${apiUrl.url}/users/addCart`, requestOptions)
    .then(handleResponse)
    .then(user => {
        return user;
    });
}

function getCartData(items) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items)
    };

    return fetch(`${apiUrl.url}/users/getCart`, requestOptions)
    .then(handleResponse)
    .then(data => {
        return data;
    });
}

function removeFromCart(userAuth, removeId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId:userAuth.id, cartId:removeId})
    };

    return fetch(`${apiUrl.url}/users/removefromCart`, requestOptions)
    .then(handleResponse)
    .then(user => {
        return user;
    });
}

function saveAddress(data){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/users/saveAddress`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function getAddress(id){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id:id})
    };

    return fetch(`${apiUrl.url}/users/getAddress`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function saveProfileData(data){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/users/saveProfileData`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function editAddress(data){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/users/editAddress`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function removeAddress(id, user_id){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id,user_id})
    };

    return fetch(`${apiUrl.url}/users/removeAddress`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function getMyOrders(id){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id:id})
    };

    return fetch(`${apiUrl.url}/users/getMyOrders`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function submitContactUs(data){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl.url}/users/contactUs`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function forgotPasswordOTP(num,resend){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({mobile:num, resend:resend})
    };

    return fetch(`${apiUrl.url}/users/sendOTP`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
}

function forgotPwdChangePwd(otp,pwd,mobile){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({otp,pwd,mobile})
    };

    return fetch(`${apiUrl.url}/users/changePassword`, requestOptions)
    .then(handleResponse)
    .then(res => {
        return res;
    });
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