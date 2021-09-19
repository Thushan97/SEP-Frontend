import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import '../style/loginStyle.css';
import { Link } from 'react-router-dom';
import { api } from './../services/api';

class LoginForm extends Form {
    state = {
        data: { username: "", password: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };

    username = React.createRef();

    // componentDidMount(){
    //     this.username.current.focus();
    // }

    doSubmit = async () =>{
        const response = await api.auth.login(this.state.data);
        
    }


    render() { 
        const { data, errors } = this.state;
        return (
            <div className="loginBackground">
                <div className="form">
                <form className="loginForm" onSubmit={this.handleSubmit}>
                
                    <div className="form-group">
                  
                        <label htmlFor="username">Username</label>
                        <input 
                            ref={this.username} 
                            value={data.username}
                            onChange={this.handleChange}
                            id="username" 
                            name="username"
                            type="text" 
                            className="form-control" 
                            placeholder="Username"
                        />
                        {errors.username && <div className="alert alert-danger">
                            {errors.username}
                        </div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            value={data.password}
                            onChange={this.handleChange}
                            name="password"
                            id="password" 
                            type="password" 
                            className="form-control " 
                            placeholder="Password"/>
                        {errors.password && <div className="alert alert-danger">
                            {errors.password}
                        </div>}
                    </div>

                    <button disabled={this.validate()} className="btn btn-primary">Login</button>

                    <span className="loginForgot">Forgot Password?</span>

                    <Link to="/register">
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </Link>
                    
                </form>
                </div> 
            </div>
                
           
         );
    }
 
}
 
export default LoginForm;