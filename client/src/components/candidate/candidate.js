import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import {connect } from 'react-redux';
import { store } from '../../store';
import { voterData, candidateData , addError } from "../../store/actions";

function Candidate(props) {
    const [state , setState] = useState({
        name:"",
        email: "",
        citizenship:""
    });

    useEffect(()=>{
      // console.log("inside cand1" , props.people.candidates)
       
       props.candidateData();
      // console.log("inside cand2" , props.people.candidates)

    },[]);
    const example=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value})
    }
    function submit(e){
        e.preventDefault();
       console.log(props)


        console.log(state)
        const data = {
            "name": state.name,
            "email": state.email,
            "citizenship":state.citizenship
        }
        console.log(data)
        axios.post('http://localhost:5000/voting/candidate/' , data)
            .then(res =>{
                if (typeof(res.data) !== "object"){
                    store.dispatch(addError(res.data))
                  }
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err.message)
            })





           

    }
    return (
      <div>
        <form onSubmit={submit}>
          <label htmlFor="name">Name</label>
          <input
            className="name"
            name="name"
            value={state.name}
            onChange={example}
          />
          <label htmlFor="email">email</label>
          <input
            className="email"
            name="email"
            value={state.email}
            onChange={example}
          />
          <label htmlFor="citizenship">citizenship</label>
          <input
            className="citizen"
            name="citizenship"
            value={state.citizenship}
            onChange={example}
          />
          <button type="submit">sumbit</button>
        </form>
      </div>
    );
}

export default connect(store => ({people: store.cvData}) , {candidateData  , voterData})(Candidate);

