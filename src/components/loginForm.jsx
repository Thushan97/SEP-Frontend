import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import '../style/loginStyle.css';
import { Link } from 'react-router-dom';
import { api } from './../services/api';

class LoginForm extends Form {
    state = {
        data: { email: "", password: ""},
        errors: {}
    };

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(8).label("Password")
    };

    email = React.createRef();

    // componentDidMount(){
    //     this.email.current.focus();
    // }

    doSubmit = async () =>{
        try{
            console.log(this.state.data);
            const response = await api.auth.login(this.state.data);
            console.log(response.data.info.userType);
            // console.log(response.data.access_token);
            localStorage.setItem("token", response.data.auth_token);
            localStorage.setItem("email", response.data.info.email);
            localStorage.setItem("user", response.data.info.userType);
            // console.log(localStorage.getItem("email"));
            //registerAccessToken(response.data.auth_token);
            const path = response.data.info['userType'];
            this.props.history.push(`/${path}`);
            
        }
        catch (ex){
            if(ex.response && ex.response.status === 401){
                const errors = {...this.state.errors};
                errors.email = "Invalid email or password!";
                this.setState({ errors });
            }
        } 
    }


    render() { 
        const { data, errors } = this.state;
        return (
            <div className="loginBackground">
                <div className="form">
                <form className="loginForm" onSubmit={this.handleSubmit}>
                
                    <div className="form-group">
                  
                        <label htmlFor="email">Username</label>
                        <input 
                            ref={this.email} 
                            value={data.email}
                            onChange={this.handleChange}
                            id="email" 
                            name="email"
                            type="text" 
                            className="form-control" 
                            placeholder="Username"
                        />
                        {errors.email && <div className="alert alert-danger">
                            {errors.email}
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