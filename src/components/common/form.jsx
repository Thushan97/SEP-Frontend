import { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly: false});
        
        if(!result.error) return null;

        const errors = {};
        for(let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;

    };

    validateProperty = ({name, value}) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        //const username = this.username.current.value;

        const errors = this.validate();
       
        this.setState({ errors: errors || {} });
        if( errors ) return;

        this.doSubmit();    
    };

    handleChange = e => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if(errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];

        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data, errors });
    };

    // renderButton(label){
    //     <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    // }

}
 
export default Form;