import React, { useState, useEffect, useRef, Component } from "react";
import VotingContract from "../../contracts/Voting.json"
import getWeb3 from "../../getWeb3"
import { voterData, candidateData } from "../../store/actions";
import { connect } from "react-redux";
import "./admin.css";
import Forbidden from "../forbidden/forbidden";

class Admin extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    voteStatus: null,
    ballotAddress: "",
    accountAddress:"",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const sta = await instance.methods.state.call().call();
      const add = await instance.methods.ballotOfficialAddress.call().call();

      this.setState({
        voteStatus: sta,
        web3,
        accounts,
        contract: instance,
        ballotAddress: add,
        accountAddress: accounts[0],
      });
    } catch (error) {
      console.error(error);
    }
    this.props.candidateData();
    this.props.voterData();
  };

  startVote = async () => {
    const { accounts, contract, web3 } = this.state;

    try {
      await contract.methods.startVote().send({ from: accounts[0] });
      window.location.reload(false);
    } catch (error) {
      console.log(" start vote error", error)
    }
  }

  endVote = async () => {
    const { accounts, contract, web3 } = this.state;
       
       try {
         await contract.methods.endVote().send({ from: accounts[0] });
      
       } catch (error) {
         console.log(" end vote error", error)
       }
     }
  declareResult = async () => {
    const { accounts, contract, web3 } = this.state;
       
       try {
         await contract.methods.result().send({ from: accounts[0] });
      
       } catch (error) {
         console.log(" declare result  error", error)
       }
     }
     
     
  approveCand = (data) => {
    console.log("approveCand data ", data);

    this.props.history.push({
      pathname: "/approvecand",
      search: "?id=" + data._id,
      state: data,
    });
  };

  render() {
    console.log("inside admin", this.props.people.candidates);
    let content;

    
    let stats = <span>Not Known</span>;
    if (this.state.voteStatus === "0") {
      stats = <span>Not Started</span>;
    }
    if (this.state.voteStatus === "1") {
      stats = <span>running</span>;
    }
    if (this.state.voteStatus === "2") {
      stats = <span>Ended</span>;
    }
    const candData = this.props.people.candidates.length ? (
      this.props.people.candidates.map((result) => {
        return (
          <tr key={result.date}>
            <td>{result.name}</td>
            <td>{result.email}</td>
            <td>{result.citizenship}</td>
            <td>{result.date}</td>
            <td>
              <button onClick={() => this.approveCand(result)}>approve</button>
            </td>
          </tr>
        );
      })
      ) : (
        <p>nodaataaaa</p>
        );
        console.log(this.state);
        
        const votData = this.props.people.voters.length ? (
          this.props.people.voters.map((result) => {
            return (
              <tr key={result.date}>
            <td>{result.name}</td>
            <td>{result.email}</td>
            <td>{result.citizenship}</td>
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
        if (this.state.accountAddress === this.state.ballotAddress) {
    
          content =  <div>
            <button onClick={this.startVote}>Start Vote</button>
            <br />
            <button onClick={this.endVote}>End Vote</button>
            <br />
            <button onClick={this.declareResult}>Declare Result</button>
            <br />
            <p>Ballot Address : {this.state.ballotAddress}</p>
            {/* <p>Account Address : {this.state.accountAddress}</p> */}
            <p>Total Voter ....</p>
            <p>Total Candidate ...</p>
            <p>Vote Status :: {stats} </p>
            <h2>Candidate Table</h2>
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Citizenship</th>
                <th>Date</th>
                <th>approve</th>
              </tr>
              {candData}
            </table>
            <br />
            <br />
            <br />
            <h2>Voter Table</h2>
    
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Citizenship</th>
                <th>Date</th>
                <th>approve</th>
              </tr>
              {votData}
            </table>
          </div>
         
        }
        else {
           return <Forbidden />;
          
        }
        
    return (
      <div>
          {content}
        </div>
          
    );
  }
}

export default connect((store) => ({ people: store.cvData }), {
  candidateData,
  voterData,
})(Admin);
