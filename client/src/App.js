import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import styled from 'styled-components';
import Users from './users/Users';
import Signin from './auth/Signin';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'vera',
      password: 'password'
    };
  }
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/" exact>
            Home
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/users" exact>
            Users
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to="signin">Sign In</NavLink>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={Signin} />
        </main>
      </div>
    );
  }
}

export default App;
