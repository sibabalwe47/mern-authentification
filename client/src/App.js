import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

// Components

import LoginForm from './components/forms/LoginForm'
import Dashboard from './components/forms/layouts/Dashboard'
// Provider

import { Provider } from 'react-redux'
import store from './store/store'

// AUTH MIDDLEWARE

import { setAuthToken } from './utils/setAuthToken'
import { loadUser } from './store/actions/Auth'

// SET token

if(localStorage.token) {
    setAuthToken(localStorage.token)
}

const App  = () => {

    useEffect(() => {
        store.dispatch(loadUser())

        // GET auth state

        setTimeout(()=> {
            const isAuthenticated = store.getState().Auth.isAuthenticated;
            if(isAuthenticated) {
               return <Redirect to="/dashboard" />
            }
        }, 3000)
    }, [])


    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginForm} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;