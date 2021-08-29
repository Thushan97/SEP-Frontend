import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import '../style/loginStyle.css'

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

    doSubmit = () =>{
        // call the server
        console.log("Submitted");
    }

    render() { 
        const { data, errors } = this.state;
        return (
            <div className="loginback">
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
                            placeholder="Username"/>
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
                </form>
                </div> 
            </div>
                
           
         );
    }
}
 
export default LoginForm;