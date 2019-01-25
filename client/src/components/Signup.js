import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 400px;
  margin: 0 100px;
  flex-direction: column;
`;

class Signup extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:3300/api/register";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => {
        console.log("ERROR");
      });

    this.props.history.push("/users");
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              label="Username"
              name="username"
              placeholder="your@email.com"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <input
              label="Password"
              name="password"
              placeholder="·····"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <input
              label="Department"
              name="department"
              placeholder="Computer Science"
              value={this.state.department}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <button primary lg type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </Container>
    );
  }
}

export default Signup;
