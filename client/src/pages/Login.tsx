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
        <Form onSubmit={submitHandler}>
            
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter your Email Address'
                    value={email}
                    onChange= { (e) => setEmail(e.target.value) }
                ></Form.Control>
            </Form.Group>
        
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter your Password'
                    value={password}
                    onChange= { (e) => setPassword(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-3'>
                Sign In
            </Button>

            <Row className="py-3">
                <Col>
                    New Customer <Link to="/register">Register here</Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}

export default Login
