import React from 'react'
import './landing.css'

const  landing = ( props ) => {

    return (
        <div className="container grid-container">
            <button className="candidate grid-item" onClick={()=> props.history.push('/candidate')}>Apply for Candidate</button>
            <button className="voter grid-item" onClick={()=> props.history.push('/voter')}>Apply for Voter</button>
            <button className="vote grid-item" onClick={()=> props.history.push('/login')}>Cast a Vote</button>
        </div>
    )
}

export default landing
