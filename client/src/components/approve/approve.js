import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { store } from "../../store";
import { voterData, candidateData, addError } from "../../store/actions";

import "./approve.css";
class ApproveCandidate extends Component {
  state = {
    account: "",
    key: "",
    result: {},
    mode: "",
  };
  set = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    console.log(
      "locatation props of candidae in approve ",
      this.props.location.state
    );
    const data = this.props.location.state;
    console.log(data);
    this.setState({
      mode: this.props.location.state.mode,
      result: {
        ...data,
      },
    });
  }

  submit = (e) => {
    e.preventDefault();
    console.log("inside submit mode", this.state.mode);
      const data = {
        citizenship:this.state.result.citizenship,
        account: this.state.account,
        id: this.state.result._id,
      };
      axios
        .post("http://localhost:5000/voting/candaccount/", data)
        .then((res) => {
          if (typeof res.data !== "object") {
            store.dispatch(addError(res.data));
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="account">Account</label>
          <input
            className="account"
            name="account"
            value={this.state.account}
            onChange={this.set}
            required
          />
          <label htmlFor="key">Key</label>
          <input
            className="key"
            name="key"
            value={this.state.key}
            onChange={this.set}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect((store) => ({ error: store.error }))(ApproveCandidate);
