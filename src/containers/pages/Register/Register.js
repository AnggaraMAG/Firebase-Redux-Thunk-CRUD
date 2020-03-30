import React, { Component } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserApi } from "../../../config/redux/action";
class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeText = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    // console.log(e.target.value);
  };

  handleRegisterSubmit = () => {
    const { email, password } = this.state;
    console.log("data before send ", email, password);
    this.props.registerApi({ email, password });
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input
            className="input"
            id="email"
            placeholder=" Email"
            type="email"
            onChange={this.handleChangeText}
          />
          <input
            className="input"
            id="password"
            placeholder=" Password"
            type="password"
            onChange={this.handleChangeText}
          />
          <Button
            onClick={this.handleRegisterSubmit}
            title={"Register"}
            loading={this.props.isLoading}
          />
        </div>
        {/* <button>Go to Dashboard</button> */}
      </div>
    );
  }
}

const reduxState = state => ({
  isLoading: state.isLoading
});

const reduxDispatch = dispatch => ({
  registerApi: data => dispatch(registerUserApi(data))
});
export default connect(reduxState, reduxDispatch)(Register);
