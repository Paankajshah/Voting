import React, { Component } from "react";
import axios from "axios";
import "./approveCandidate.css"
class ApproveCandidate extends Component {
  state = {
    account: "",
    key: "",
    result: { name: "" },
  };
  set = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    const data = this.props.location.state;
    console.log(data)
    this.setState({
      result: {
     ...data
    }});
    
   

  }


  submit = (e) => {
    e.preventDefault();
    console.log("inside submit" , this.state.result._id)
    const data = {
      account : this.state.account,
      id : this.state.result._id
    }
   axios.post('http://localhost:5000/voting/candaccount/' , data)
         .then(res =>{
    //         if (typeof(res.data) !== "object"){
    //             store.dispatch(addError(res.data))
    //           }
             console.log(res.data)
      })
         .catch(err=>{
             console.log(err.message)
         })
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

export default ApproveCandidate;
