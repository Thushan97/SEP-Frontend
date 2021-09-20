import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import '../style/loginStyle.css';
import { Link } from 'react-router-dom';
import { api, registerAccessToken } from './../services/api';

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
            const response = await api.auth.login(this.state.data);
            console.log(response.data.access_token);
            sessionStorage.setItem("token", response.data.access_token);
            registerAccessToken(response.data.access_token);
            this.props.history.push("/systemAdmin");
            
        }
        catch (ex){
            if(ex.response && ex.response.status === 400){
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