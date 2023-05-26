import  {useState , useEffect} from 'react'
import {Link} from "react-router-dom"
import {Message , Uploader , Loader} from "rsuite"
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import {Form , Button , Row } from "react-bootstrap"
import FormContainer from '../components/FormContainer'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import {useUpdateMutation } from '../app/slices/userApiSlice'
import { setCredentials } from '../app/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


//<Avatar size='lg' src={`${(userInfo as any).profilepicture}`} alt="profile" />

function previewFile(file:any, callback:any) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}


function Profile() {

    const [name, setName] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [update , {isLoading}] = useUpdateMutation()
    const {userInfo}:any = useAppSelector((state) => state.auth )

    useEffect(() => {
        setName(userInfo?.name)
        setEmail(userInfo?.email)
        setFileInfo(userInfo?.profilepicture)
        setPassword("")
    } , [userInfo.setName, userInfo.setEmail])


        const submitHandler = async (e:any) => {
        e.preventDefault()
        console.log("submit" , email , password , name , confirmpassword)
        if(password !== confirmpassword){
                toast.error("Make sure passwords match!")
                return
        }
        try {
           const res = await update({ _id:userInfo._id ,email ,name ,password}).unwrap()
           dispatch(setCredentials({...res.user}))
           toast.success("Successfully Updated")
           navigate("/")
        } catch (err:any) {
            toast.error(err?.data?.message || err.error)
            console.error(err)
        }
    }

  return (
    <FormContainer>
        <h1 className='fw-bold'>Update your Profile</h1>
        
        {/*NOTE: uploader component from rsuite */} 
        
            <Uploader
      fileListVisible={false}
      listType="picture"
      action=""
      onUpload={file => {
        setUploading(true);
        console.log(file.name)
      }}
      onSuccess={(response, file) => {
        setUploading(false);
        toast.success("Uploaded successfully")
        console.log(response);
      }}
      onError={() => {
        setFileInfo(null);
        setUploading(false);
        toast.error("Upload Failed")
      }}
    >
      <button style={{ width: 150, height: 150 , border:"none" }}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <AvatarIcon style={{ fontSize: 80 }} />
        )}
      </button>
    </Uploader>
        

        {/*NOTE: uploader component from rsuite */} 

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
               Save 
            </Button>


        </Form>
    </FormContainer>
  )
}

export default Profile 
