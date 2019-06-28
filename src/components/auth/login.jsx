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
    const { data } = this.state;
    return (
      <React.Fragment>
        <header><h2>Login</h2></header>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput('email', null, null, data.email)}
            {this.renderInput('password', 'password', null, data.password)}
          </div>
            {this.renderButton('Login')}
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
