import {useState , useEffect} from 'react'
import {Link , useNavigate} from "react-router-dom"
import { useAppSelector , useAppDispatch } from '../app/hooks'
import {Form , Button , Row , Col} from "react-bootstrap"
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../app/slices/userApiSlice'
import { setCredentials } from '../app/slices/authSlice'
import {toast} from "react-toastify"
import Loader from '../components/Loader'


function Login() {

    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [login , {isLoading}] = useLoginMutation()
    const {userInfo} = useAppSelector((state) => state.auth)

    useEffect (() => {
            if(userInfo){
                navigate("/")
            }
        } , [navigate , userInfo])

    const submitHandler = async (e:any) => {
        e.preventDefault()
        try {
           const res = await login({email , password}).unwrap() 
           dispatch(setCredentials({...res.user}))
           toast.success("Welcome to Hell!")
           navigate("/")
        } catch (err:any) {
           const error = err?.data?.message || err.error
           toast.error(error)
        }
    }

  return (
    <FormContainer>
        <h1 className='fw-bold'>Sign In</h1>
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
            
            {isLoading ?? <Loader />}

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
