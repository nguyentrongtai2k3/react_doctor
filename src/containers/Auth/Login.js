import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errMessage: "",
    };
  }
  handleOnchangeUsername = async (event) => {
    await this.setState({
      userName: event.target.value,
    });
  };
  handleOnchangePassword = async (event) => {
    await this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.userName, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login succesfully");
      }
      console.log(data);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="login-bgr">
          <div className="login-container">
            <div className="login-content">
              <div id="loginform">
                <h2 id="headerTitle">Login</h2>
                <div>
                  <FormInput
                    description="Username"
                    placeholder="Enter your username"
                    type="text"
                    value={this.state.userName}
                    onChange={(event) => this.handleOnchangeUsername(event)}
                  />
                  <FormInput
                    description="Password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={(event) => this.handleOnchangePassword(event)}
                    value={this.state.password}
                  />
                  <ErrMessage errorMess={this.state.errMessage} />
                  <FormButton
                    onClick={() => {
                      this.handleLogin();
                    }}
                    title="Log in"
                  />
                </div>
                <OtherMethods />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const Form = (props) => (
  <div>
    <FormInput
      description="Username"
      name="username"
      placeholder="Enter your username"
      type="text"
    />
    <FormInput
      description="Password"
      name="password"
      placeholder="Enter your password"
      type="password"
    />
    <FormButton title="Log in" />
  </div>
);

const FormButton = (props) => (
  <div id="button" class="row">
    <button onClick={props.onClick} method="POST">
      {props.title}
    </button>
  </div>
);

const FormInput = (props) => (
  <div class="row">
    <label>{props.description}</label>
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);
const ErrMessage = (props) => (
  <div className="row" style={{ color: "red" }}>
    {props.errorMess}
  </div>
);
const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
      <OutLook />
    </div>
  </div>
);

const Facebook = (props) => (
  <a href="#" id="facebookIcon">
    <i className="fa-brands fa-facebook"></i>
  </a>
);

const Twitter = (props) => (
  <a href="#" id="twitterIcon">
    <i class="fa-brands fa-twitter"></i>
  </a>
);

const Google = (props) => (
  <a href="#" id="googleIcon">
    <i class="fa-brands fa-google"></i>
  </a>
);
const OutLook = (props) => (
  <a href="#" id="googleIcon">
    <i class="fa-brands fa-windows"></i>
  </a>
);
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
