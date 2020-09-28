import React, { Component } from 'react'
import './landing.css'
import { store } from "../../store";
import { setCurrentUser, addError, removeError } from "../../store/actions";
import decode from "jwt-decode"

if (localStorage.loginToken) {
  // setToken(localStorage.jwtToken);
  try {
    const data = decode(localStorage.loginToken);
    const finalData = {
        name: data.name,
        username: data.username,
        email: data.email,
    };
      store.dispatch(setCurrentUser(finalData));
      store.dispatch(removeError());
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError());
  }
}

const Landing  =(props) => {

   
        return (
            <div className="container grid-container">
            <button className="candidate grid-item" onClick={()=> props.history.push('/candidate')}>Apply for Candidate</button>
            <button className="voter grid-item" onClick={()=> props.history.push('/voter')}>Apply for Voter</button>
            <button className="vote grid-item" onClick={()=> props.history.push('/login')}>Cast a Vote</button>
        </div>
    )
  
}
export default Landing

