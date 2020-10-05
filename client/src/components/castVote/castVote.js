import React, { Component } from "react";
import VotingContract from "../../contracts/Voting.json";
import getWeb3 from "../../getWeb3";
import { store } from "../../store";
import { setCurrentUser, addError, removeError } from "../../store/actions";
import "./castVote.css"

class CastVote extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    voteStatus: null,
    ballotAddress: "",
    accountAddress: "",
    totalVoter: null,
    totalCandidate: null,
    candidates: [],
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const sta = await instance.methods.state.call().call();
      const add = await instance.methods.ballotOfficialAddress.call().call();
      const voter = await instance.methods.totalVoter.call().call();
      const candidate = await instance.methods.totalCandidate.call().call();
      this.setState({
        voteStatus: sta,
        web3,
        accounts,
        contract: instance,
        ballotAddress: add,
        accountAddress: accounts[0],
        totalVoter: voter,
        totalCandidate: candidate,
      });
    } catch (error) {
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, web3, candidates } = this.state;
    console.log(this.state);
    try {
      // const voter = await contract.methods.totalVoter.call().call();
      // console.log(voter)
      // const candidate = await contract.methods.totalCandidate.call().call();
      // console.log(candidate)
      for (let i = 0; i <= 3; i++) {
        const data = await contract.methods.candidateAddress(i).call();
        const dataa = await contract.methods.candRegister(data).call();
        candidates.push(dataa);
      }
      console.log(candidates);
      this.forceUpdate();

      // for (let i = 1; i <= accountsForVoter.length; i++)
      // {
      //   const response = await contract.methods
      //     .addVoter(accountsForCandidate[i - 1], `voter${i}`)
      //     .send({ from: accounts[0] });
      //   console.log(response);

      // }
      // const sVote = await contract.methods.result().send({ from: accounts[0] });
      // console.log(sVote);

      // const sta = await contract.methods.state.call().call();
      // console.log(sta);
      // const data = await contract.methods.winner.call().call();
      // console.log(data);
      // Stores a given value, 5 by default.
      //await contract.methods.set(500).send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      //const response = await contract.methods.get().call();

      // Update state with the result.
      // this.setState({ storageValue: response });
      //console.log(accountsForCandidate.length)
    } catch (err) {
      console.log(err);
    }
  };

  logoutHandler =()=> {
    localStorage.clear();
    this.props.history.push("/");
    store.dispatch(setCurrentUser({}));
    store.dispatch(removeError());

  }

  render() {
    console.log(this.state.candidates.length !== 0);

    const cards =
      this.state.candidates.length !== 0 ? (
        this.state.candidates.map((candidate) => {
          const image = `uploads/${candidate.citizenship}.jpg`
          return (
            <div className="col-sm" style={{ marginBottom: "20px" }}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src={image}
                  alt="Card image cap"
                  width="100px"
                  height="100px"
                />
                <div className="card-body">
                  <p className="card-text">{candidate.name}</p>
                  <p className="card-text">{candidate.party}</p>
                  <button onClick={()=> alert(candidate.candAddress)}>alert</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>no data</p>
      );
    return (
      <div className="contaiiner">
        <div className="header">
          <div className="arrow-div">
            <svg
              onClick={() => {
                this.props.history.push("/");
              }}
              width="2em"
              height="1em"
              viewBox="0 0 16 16"
              className="arrow bi bi-arrow-left-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </div>

          <div className="voting-section">
            <marquee behaviour="alternate">
            
              <span className="marquee">Voting Section</span>
            </marquee>
          </div>
          <button
            className="btn btn-primary logout"
            onClick={this.logoutHandler}
          >
            Logout
          </button>
        </div>

        <div className="voting-info">this is voting info</div>
        <div className="voting-area">
          <button className="vote-active-button" onClick={this.runExample}>
            Start Voting
          </button>
          <div className="row">{cards}</div>
        </div>
      </div>
    );
  }
}

export default CastVote;
