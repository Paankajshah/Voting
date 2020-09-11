import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Candidate from "./components/candidate/candidate";
import voter from "./components/voter/voter";
import { Provider } from "react-redux";
import { store } from "./store";
import landing from "./components/landing/landing";
import Admin from "./components/admin/admin";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={landing} />
          <Route path="/candidate" component={Candidate} />
          <Route path="/admin" component={Admin} />
          <Route path="/voter" component={voter} />
        </Router>
      </Provider>
    );
  }
}

export default App;
