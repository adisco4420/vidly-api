import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';

class Register extends Form {
    state = {
        data: {name: '', email: '', password: ''},
        errors: {}
    };
    schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }
    doSubmit = () => {
      //server call
      console.log('submitted');
      
    }
  
    render() {
      const { data } = this.state;
      return (
        <React.Fragment>
          <header><h2>Register</h2></header>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('name', null, null, data.name)}
              {this.renderInput('email', 'email', null, data.email)}
              {this.renderInput('password', 'password', null, data.password)}
            </div>
              {this.renderButton('Login')}
          </form>
        </React.Fragment>
      );
    }
}
 
export default Register;