import React, { useState, useEffect, useRef } from "react";
import { withRouter } from 'react-router-dom'
import axios from "axios";
import "./admin.css"

function Admin(props) {
  const [candidate, setCandidate] = useState({
      candidate:[]
  });
  const [voter, setVoter] = useState({
      voter:[]
  });



//   zaxios.get("http://localhost:5000/voting/candidates").then(res =>{
//     setCandidate({candidate:res.data})
//     console.log("random called")

// })
    
  


  useEffect(async () => {
    let mounted = true;
    const response = await axios.get("http://localhost:5000/voting/candidates");
    if (mounted) {
      console.log(response.data);
      setCandidate({candidate:response.data})

    }
    console.log("with router" , props)
    return function() {
      mounted = false;
    };
    
   
  }, []);

  useEffect(()=>{
    axios.get("http://localhost:5000/voting/voters").then((res) => {
      console.log(res.data);
      setVoter({voter:res.data})
    });

  },[])
  const example =()=>{
      console.log(candidate.candidate)
  }


  const candidateData = candidate.candidate.length ? candidate.candidate.map(result =>{
   return( <tr key={result.date}>
    <td>{result.name}</td>
    <td>{result.email}</td>
    <td>{result.date}</td>
    <td><button>approve</button></td>
  </tr>)
  }):<p>nodaataaaa</p>

  const voterData = voter.voter.length ? voter.voter.map(result =>{
   return( <tr key={result.date}>
    <td>{result.name}</td>
    <td>{result.email}</td>
    <td>{result.date}</td>
    <td><button>approve</button></td>
  </tr>)
  }):<p>nodaataaaa</p>

  return (
    <div>
        <button onClick={example}>app</button>
      <h2>Candidate Table</h2>
      <table >
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>approve</th>
        </tr>
        {candidateData}
      </table>
      <br/>
      <br/>
      <br/>

      <table >
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>approve</th>
        </tr>
        {voterData}
      </table>

    </div>
  );
}

export default Admin;
