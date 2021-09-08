import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import '../style/loginStyle.css';

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
        name: Joi.string().required().label("Name")
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

                    <button disabled={this.validate()} className="btn btn-primary">Register</button>
                </form>
            </div> 
            </div>
            
            
         );
    }
}
 
export default RegisterForm;

