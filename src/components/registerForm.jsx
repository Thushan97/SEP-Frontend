import React from 'react';
import Joi, { errors } from 'joi-browser';
import Form from './common/form';
import '../style/loginStyle.css';
import { api } from '../services/api';

class RegisterForm extends Form {
    state = {
        data: { email: "", password: "", name: ""},
        errors: {}
    };

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(8).label("Password"),
        name: Joi.string().required().min(3).label("Name")
    };

    email = React.createRef();

    // componentDidMount(){
    //     this.email.current.focus();
    // }

    doSubmit = async () =>{
        // call the server
        try{
            const response = await api.auth.register(this.state.data);
        }
        catch (ex) {
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        const { data, errors } = this.state;
        return (
            <div className="loginBackground">
                <div className="form">
                {/* <h1>Register</h1> */}
                <form className="registerForm" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            value={data.name}
                            onChange={this.handleChange}
                            name="name"
                            id="text" 
                            className="form-control " 
                            placeholder="Name"/>
                        {errors.name && <div className="alert alert-danger">
                            {errors.name}
                        </div>}
                    </div>

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
                            placeholder="Username"/>
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

                    <button disabled={this.validate()} className="btn btn-primary">Register</button>
                </form>
            </div> 
            </div>
            
            
         );
    }
}
 
export default RegisterForm;

