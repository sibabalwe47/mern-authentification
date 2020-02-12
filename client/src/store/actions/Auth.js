import {
    AUTH_ERROR,
    AUTH_SUCCESS,
    LOAD_USER,
    LOAD_USER_ERROR
} from './types'
import axios from 'axios'


export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_ERROR,
        })
    }
}


export const loginUser = ({email, password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email, 
        password
    })

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: AUTH_ERROR,
            payload: error
        })
    }

    // const res = await axios.post('/api/auth');
    // console.log(res)
}