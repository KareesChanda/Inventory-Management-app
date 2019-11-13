const config = require('../config');
let api = config.api;

export const userPostFetch = user => {
    return dispatch => {
        return fetch(`${api}/auth/customers/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("userId", data.userId)
                    dispatch(loginUser(data))
                }
            })
    }
};

export const userLoginFetch = user => {
    return dispatch => {
        return fetch(api + "/auth/customers/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userId", data.userId);
                    dispatch(loginUser(data))
                }
            })
    }
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        const userId = localStorage.userId;
        if (token) {
            return fetch(`${api}/customers/${userId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.error) {
                        // An error will occur if the token is invalid.
                        // If this happens, you may want to remove the invalid token.
                        localStorage.removeItem("token")
                        localStorage.removeItem("userId")
                    } else {
                        dispatch(loginUser(data))
                    }
                })
        }
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})