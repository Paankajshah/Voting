import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Candidate from "./components/candidate/candidate";
import voter from "./components/voter/voter";
import { connect, Provider } from "react-redux";
import { store } from "./store";
import { voterData, candidateData } from "./store/actions";
import landing from "./components/landing/landing";
import Admin from "./components/admin/admin";
import ErrorMessage from "./components/ErrorMessage";
import Approve from "./components/approve/approve";
import ApproveVoter from "./components/approve/ApproveVoter";
import login from "./components/login/login"
import castVote from "./components/castVote/castVote"
import OtpPage from "./components/login/otpPage";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <ErrorMessage />
        <Router>
          <Route path="/" exact component={landing} />
          <Route path="/approve" component={Approve} />
          <Route path="/login" component={login} />
          <Route path="/castvote" component={castVote} />
          <Route path="/approvevoter" component={ApproveVoter} />
          <Route path="/otppage" component={OtpPage} />
          <Route path="/candidate" component={Candidate} />
          <Route path="/admin" component={Admin} />
          <Route path="/voter" component={voter} />
        </Router>         
      </Provider>
    );
  }
}

export default App;
