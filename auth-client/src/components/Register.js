import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: '',
  password: '',
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: '',
    }
  }

  inputHandler =  (event) => {
    const { name, value } = event.target;
    this.setState({user: {...this.state.user, [name]: value}});
  }

  submitHandler = (event) => {
    event.preventDefault();
    axios.post(`${url}/api/register`, this.state.user)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            message: 'Registration Successful!',
            user: {...initialUser},
          })
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: 'Registration Failed!',
          user: {...initialUser},
        })
      });

  }

  render() {
    return (
    <div>
    <form onSubmit={this.submitHandler}>
      <label htmlFor="username">Username</label>
      <input 
        type='text' 
        id='username' 
        name='username' 
        value={this.state.user.username}
        onChange={this.inputHandler}></input>

      <label htmlFor="password">Password</label>
      <input 
      type='text' 
      id='password' 
      name='password' 
      value={this.state.user.password}
      onChange={this.inputHandler}></input>
    </form>
    <button type="submit">Submit</button>

    { this.state.message 
        ? (<h3>{this.state.message}</h3>)
        : undefined
    }
    
    </div>

    );
  }
}