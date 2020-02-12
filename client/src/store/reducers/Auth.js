import {
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOAD_USER
} from '../actions/types'


const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    isLoading: false
}


export default (state = initialState, action) => {

    const {type, payload} = action

    switch(type) {

        case LOAD_USER: 
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                isLoading: true
            }

        case AUTH_SUCCESS:

            localStorage.setItem('token', payload.token)

            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                isLoading: true
            }

        case AUTH_ERROR:

            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false
            }

        default: 
            return state;
    }
}