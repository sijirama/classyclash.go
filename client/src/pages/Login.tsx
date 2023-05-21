import React , {useState} from 'react'
import {Link} from "react-router-dom"
import {Form , Button , Row , Col} from "react-bootstrap"
import FormContainer from '../components/FormContainer'

function Login() {

    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e:any) => {
        e.preventDefault()
        console.log("submit" , email , password)
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
    </FormContainer>
  )
}

export default Login
