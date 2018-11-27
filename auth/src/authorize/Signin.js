import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    state = {
        username: 'lee1',
        password:'lee1'
    }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <div>
                  <label htmlFor="username">Username</label>
              <input 
              name="username" 
              value={this.state.username}
              onChange={this.handleInputChange} 
              type="text"
              />
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  type="password"
                  />
              </div>
              <div>
                  <button type="submit">Sign In</button>
              </div>

          </form>
      </div>
    );
  }

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value })
  }
  handleSubmit = event => {
      event.preventDefault();
      const endpoint = 'http://localhost:4200/api/login'
      console.log(this.state);
      axios
      .post(endpoint, this.state)
      .then(res => {
          console.log(res.data);
          localStorage.setItem('jwt', res.data.token)
      })
      .catch(err => {
          console.error('ERROR!', err)
      })
  }
}

export default Signin;
