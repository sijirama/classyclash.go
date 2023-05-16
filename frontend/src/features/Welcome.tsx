//import React from 'react'
import {Link} from "react-router-dom"

function Welcome() {
    
    //const date = new Date()
    const today = "Wednesday 13:45 Am"


  return (
    <section className='welcome'>
        <p>{today}</p>
        <h1>Welcome!</h1>
        <p><Link to="/dash/notes">View technotes</Link></p>
        <p><Link to="/dash/users">View User settings</Link></p>
    </section>
  )
}

export default Welcome
