import React, { Component } from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import axios from 'axios';
import './App.css';


 const url = process.env.REACT_APP_API_URL

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users:[]
    }
  }

  authenticate =() => {
    const token = localStorage.getItem ('secret_bitcoin_token');
    const options = {
      headers: {
        authorization: token,
      }
    }


    if (token) {
      axios.get(`${url}/api/users`, options )
      .then((res) => {
        if (res.status === 200 && res.data) {
          this.setState ({
            loggedIn: true,
            users: res.data
          })
        } else {
          throw new Error()
        }
      })
      .catch((err) => {
        this.props.history.push('/login');
      })
    } else {
      this.props.history.push('/login');
    }
  } 

  componentDidMount() {
    this.authenticate();
  } 

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if(pathname ==='/' && pathname !==prevProps.location.pathname) {
      this.authenticate();
    }
    
  }

  render() {
    return (
      <div className="App">
      <nav>
        <NavLink className='links' to='/'>Home</NavLink>
        <NavLink className='links' to='/login'>Sign In</NavLink>
        <NavLink className='links' to='/register'>Sign Up</NavLink>
      </nav>
      <section>
         <Switch>
           <Route path='/register' component={Register}/>
           <Route path='/login' component={Login} />
           <Route path="/" render={() => {
              return (
                <React.Fragment>
                <h2>Users</h2>
                  <ol>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                  </ol>
                </React.Fragment>
              );
            }} />
         </Switch>
       </section>
      </div>
    );
  }
}

export default withRouter(App);
