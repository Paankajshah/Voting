import React, { Component } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, web3 } = this.state;
    console.log(this.state);

    // const response = await contract.methods
    //   .registerCandidate("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88", "pankaj")
    //   .send({ from: accounts[0] });
    // console.log(response);

    // const response = await contract.methods
    //   .voterRegister("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88")
    //   .send({ from: accounts[0] });
    // console.log(response);
    // const dataa = await contract.methods
    //   .voterRegister("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88")
    //   .call()
    //   .call();
    // console.log(dataa);
    // const response = await contract.methods
    //   .addVoter("0x82ef247050aba28c18f7a12f61dbe5bd9e494b88", "pankaj")
    //   .send({ from: accounts[0] });
    // console.log(response);
    
    try {
  // const sVote = await contract.methods.result().send({ from: accounts[0] });
  // console.log(sVote);

  const sta = await contract.methods.state.call().call();
  console.log(sta);
  const data = await contract.methods.winner.call().call();
  console.log(data);
  // Stores a given value, 5 by default.
  //await contract.methods.set(500).send({ from: accounts[0] });
  
  // Get the value from the contract to prove it worked.
  //const response = await contract.methods.get().call();
  
  // Update state with the result.
  // this.setState({ storageValue: response });
  
  } catch (err) {
  console.log(err)
  
  }
};

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <center>
          <button onClick={this.runExample}>click</button>
        </center>
      </div>
    );
  }
}

export default App;
