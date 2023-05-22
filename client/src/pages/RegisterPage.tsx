import  {useState , useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form , Button , Row , Col} from "react-bootstrap"
import FormContainer from '../components/FormContainer'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useRegisterMutation } from '../app/slices/userApiSlice'
import { setCredentials } from '../app/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



function RegisterPage() {

    const [name, setName] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [register , {isLoading}] = useRegisterMutation()
    const {userInfo} = useAppSelector((state) => state.auth)

    useEffect(() => {
            if(userInfo){
                    navigate("/")
                }
        } , [navigate , userInfo ])

    const submitHandler = async (e:any) => {
        e.preventDefault()
        console.log("submit" , email , password , name , confirmpassword)
        if(password !== confirmpassword){
                toast.error("Make sure passwords match!")
                return
        }
        try {
           const res = await register({email , password , name}).unwrap()
           dispatch(setCredentials({...res.user}))
           toast.success("Welcome to Hell!")
           navigate("/")
        } catch (err:any) {
            toast.error(err?.data?.message || err.error)
            console.error(err)
        }
    }

  return (
    <FormContainer>
        <h1 className='fw-bold'>Register</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your Full Name'
                    value={name}
                    onChange= { (e) => setName(e.target.value) }
                ></Form.Control>
            </Form.Group>

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

            <Form.Group className='my-2' controlId='confirmpassword'>
                <Form.Label>Confirm your Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter your Password Again'
                    value={confirmpassword}
                    onChange= { (e) => setConfirmPassword(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-3'>
                Submit
            </Button>

            <Row className="py-3">
                <Col>
                    Already registered <Link to="/login">Sign in</Link>
                </Col>
            </Row>

 



        </Form>
    </FormContainer>
  )
}

export default RegisterPage
