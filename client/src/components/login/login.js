import React, { Component } from "react";
import { login, removeError } from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { voterData, candidateData, addError } from "../../store/actions";
import { store } from "../../store";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    console.log("login props", this.props);
    if (this.props.auth.isAuthenticated) {
      
      return this.props.history.push("/castvote");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    e.preventDefault();
    store.dispatch(removeError());
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    const data = await this.props.login(user);
    if (this.props.error.message === null) {
      
      this.props.history.push("/otppage")
    }
    
  }

  handleRegister = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
              <button
                onClick={this.handleRegister}
                className="btn btn-lg btn-primary btn-block"
              >
                Home
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => ({ auth: store.auth, error: store.error }), {
  login,
})(Login);
