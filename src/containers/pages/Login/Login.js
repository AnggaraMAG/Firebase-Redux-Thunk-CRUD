import React, { Component } from "react";
import { connect } from "react-redux";
import "./Login.scss";
import Button from "../../../components/atoms/Button";
import { loginUserApi } from "../../../config/redux/action";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeText = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props.LoginApi({ email, password });
    if (res) {
      console.log(" login succes");
      this.setState({
        email: "",
        password: ""
      });
      history.push("/");
    } else {
      console.log("login failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input
            className="input"
            id="email"
            placeholder=" Email"
            type="email"
            onChange={this.handleChangeText}
            value={this.state.email}
          />
          <input
            className="input"
            id="password"
            placeholder=" Password"
            type="password"
            onChange={this.handleChangeText}
            value={this.state.password}
          />
          <Button
            onClick={this.handleLoginSubmit}
            title={"Login"}
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}
const reduxState = state => ({
  isLoading: state.isLoading
});

const reduxDispatch = dispatch => ({
  LoginApi: data => dispatch(loginUserApi(data))
});
export default connect(reduxState, reduxDispatch)(Login);
