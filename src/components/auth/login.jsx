import React from "react";
import Form from "../common/form";
import Joi from 'joi-browser';
import { loginSrv } from '../../services/auth';
import { toast } from 'react-toastify';



class Login extends Form {
  state = {
      data: {email: '', password: ''},
      errors: {}
  };
  schema = {
      email: Joi.string().required().email(),
      password: Joi.string().required()
  }
  storeToken(token) { localStorage['currentUser'] = token}
  async login() {
    try {
      const {data: token} = await loginSrv(this.state.data);
      this.storeToken(token);
      this.props.history.push('/')
      toast.success('login successful')
    } catch (error) {
      toast.error(error.message)      
    }
  }
  doSubmit = () => {
   this.login()
    
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
