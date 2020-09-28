import React, { Component } from "react";
import decode from "jwt-decode";
import { connect } from "react-redux";
import { store } from "../../store";
import {
  setCurrentUser,
  addError,
  removeError,
} from "../../store/actions";

class OtpPage extends Component {
  state = {
    token: "",
    code: "",
  };

  componentDidUpdate() {
    // if (!this.props.error.message) {
    //   this.props.history.push("/profile");
    // }
  }

  onChangeHandler = (e) => {
    const token = localStorage.loginToken;
    this.setState({ [e.target.name]: e.target.value, token: token });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const data = decode(this.state.token);
    const finalData = {
      name: data.name,
      username: data.username,
      email: data.email,
      };
      
      const otp = data.otp;
      const str = otp.toString()

      if (this.state.code !== "" && this.state.code === str) {
      store.dispatch(setCurrentUser(finalData));
      store.dispatch(removeError());
      this.props.history.push("/castvote")
    } else {
     store.dispatch(addError("invalid otp"));
    }
  };

  render() {
    return (
      <div className="col-md-6 mt-5 mx-auto">
        <form onSubmit={this.onSubmitHandler}>
          <p>A six digit code is sent to your email.</p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Code"
            name="code"
            value={this.state.code}
            onChange={this.onChangeHandler}
          />
          <br></br>
          <button type="submit">Verify</button>
        </form>
      </div>
    );
  }
}

export default connect(
  (store) => ({ auth: store.auth, error: store.error }),
  {}
)(OtpPage);
