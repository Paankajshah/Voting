import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import { useHistory} from 'react-router'

function Candidate(props) {
    const [state , setState] = useState({
        name:"",
        email:"",
    });

    useEffect(()=>{

    });
    const example=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value})
    }
    function submit(e){
        e.preventDefault();

        console.log(state)
        const data = {
            "name": state.name,
            "email":state.email
        }
        console.log(data)
        axios.post('http://localhost:5000/voting/candidate/' , data)
            .then(res =>{
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
                <input className="name" name="name" value={state.name} onChange={example}/>
                <label htmlFor="email">email</label>
                <input className="email" name="email" value={state.email} onChange={example}/>
                <button type="submit">sumbit</button>
            </form>
        </div>
    )
}

export default (Candidate)
