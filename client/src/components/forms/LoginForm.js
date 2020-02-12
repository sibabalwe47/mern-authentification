import React, {useState} from 'react'
import { connect } from 'react-redux'
import {loginUser} from '../../store/actions/Auth'
import PropTypes from 'prop-types'


const LoginForm = ({loginUser}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const onChange = e =>  setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        loginUser({email, password});
        //console.log(email, password)
    }

    return (
        <div className="login-form">
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email/Username:</label>
                    <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={onChange}/>
                </div>
                <button className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default connect(null, {loginUser})(LoginForm);