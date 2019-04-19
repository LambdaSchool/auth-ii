import React from 'react';
import axios from 'axios';
import { withRouter } from'react-router-dom';

class Login extends React.Component{
  state = {
    user:"",
    password:""
  }
  render(){
    return(
      <div>
      <h2>Login</h2>
      <form onSubmit={this.handleSubmit}>
      <div>
        <div>
          <label htmlFor="user"/>
          <input
            name="user"
            id="user"
            value={this.state.user}
            onChange={this.handleInputChange}
            type="text"
            placeholder="Username"
            />
        </div>
        <div>
          <label htmlFor="password"/>
          <input
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
            />
          </div>
      </div>
      <button type="submit">Login</button>
      </form>
      </div>
    )
  }
  handleInputChange = e =>{
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = e =>{
    e.preventDefault();
    const endpoint = 'http://localhost:8000/api/user/login'
    axios
      .post(endpoint, this.state)
      .then(res =>{
        console.log('response data',res.data)
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users')
      }).catch(e =>{
        console.log(e)
      })
  }
}
export default withRouter(Login);
