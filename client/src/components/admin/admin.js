import React, { useState, useEffect, useRef, Component } from "react";
import { voterData, candidateData } from "../../store/actions";
import { connect } from "react-redux";
import "./admin.css";

class Admin extends Component {
  componentDidMount() {
    this.props.candidateData();
    this.props.voterData();
  }

  render() {
    const candData = this.props.people.candidates.length ? (
      this.props.people.candidates.map((result) => {
        return (
          <tr key={result.date}>
            <td>{result.name}</td>
            <td>{result.email}</td>
            <td>{result.date}</td>
            <td>
              <button>approve</button>
            </td>
          </tr>
        );
      })
    ) : (
      <p>nodaataaaa</p>
    );
    console.log(this.props)

    const votData = this.props.people.voters.length ? (
      this.props.people.voters.map((result) => {
        return (
          <tr key={result.date}>
            <td>{result.name}</td>
            <td>{result.email}</td>
            <td>{result.date}</td>
            <td>
              <button>approve</button>
            </td>
          </tr>
        );
      })
    ) : (
      <p>nodaataaaa</p>
    );

    return (
      <div>
        <h2>Candidate Table</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>approve</th>
          </tr>
          {candData}
        </table>
        <br />
        <br />
        <br />

        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>approve</th>
          </tr>
          {votData}
        </table>
      </div>
    );
  }
}

export default connect(store => ({people: store.cvData}) , {candidateData  , voterData})(Admin);
