import React, { Component } from "react";
import InputField from "../common/input";
import Form from "../common/form";
import Joi from 'joi-browser';


class Login extends Form {
  state = {
      data: {email: '', password: ''},
      errors: {}
  };
  schema = {
      email: Joi.string().required().email(),
      password: Joi.string().required()
  }
  doSubmit = () => {
    //server call
    console.log('submitted');
    
  }

  render() {
    return (
      <React.Fragment>
        <header><h2>Login</h2></header>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            {this.renderInput('email')}
            {this.renderInput('password', 'password')}
          </div>
            {this.renderButton('Login')}
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
