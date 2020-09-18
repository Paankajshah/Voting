import React, { Component } from 'react'

 class ApproveCandidate extends Component {
    state = {
        account: "",
        key: "",
        
     }
   set =(e)=>{
        this.setState({
            ...state,
            [e.target.name]:e.target.value})
    }
  
    submit = (e)=> {
        e.preventDefault();
        // axios.post('http://localhost:5000/voting/candidate/' , data)
        //     .then(res =>{
        //         if (typeof(res.data) !== "object"){
        //             store.dispatch(addError(res.data))
        //           }
        //         console.log(res.data)
        //     })
        //     .catch(err=>{
        //         console.log(err.message)
        //     })
        this.props.history.goBack();

    }
    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <label htmlFor="account">Account</label>
                    <input className="account" name="account" value={this.state.account} onChange={this.set} />
                    <label htmlFor="key">Key</label>
                    <input className="key" name="key" value={this.state.key} onChange={this.set} />
                    <button type="submit" >Submit</button>
                </form>
                
            </div>
        )
    }
}

export default ApproveCandidate
