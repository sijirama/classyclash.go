import {Navbar , Nav , Container , NavDropdown , } from "react-bootstrap"
import {FaSignInAlt , FaSignOutAlt} from "react-icons/fa"
import {LinkContainer} from "react-router-bootstrap"
import { useNavigate , Link } from "react-router-dom"
import { useAppSelector , useAppDispatch } from "../app/hooks"
import { useLogoutMutation } from "../app/slices/userApiSlice"
import { logout } from "../app/slices/authSlice"
import { toast } from "react-toastify"
import "../styles/components/Header.scss"
import { Badge,  Avatar , Popover , Whisper } from 'rsuite';
import useScreenType from "../utils/useScreenType"
import { AiOutlineShoppingCart} from 'react-icons/ai';

export default function Header() {

    const {userInfo}:any = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const screenType = useScreenType()
    
    const [logoutApiCall] = useLogoutMutation()

    const logOutHandler = async () => {
        try {
            await logoutApiCall(null).unwrap()
            dispatch(logout(null))
            navigate("login")
        } catch (err:any) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const customPopoverStyles = {
        backgroundColor:"#212529",
        padding:'0.5rem 2.4rem',
        borderRadius:"0.5rem",
        display:"flex",
    }

const speaker = (
  <Popover  className="popover" style={customPopoverStyles}>
    <p>
        <Link to="/products">Products</Link>
    </p>
    <p>
        <Link to="/profile">Update Profile</Link>
    </p>
    <p>
        <Link to="/about">About sandbox</Link>
    </p>
    <p onClick={logOutHandler}>Log out</p>
  </Popover>
);
//{(userInfo as any).name}
 //                            <NavDropdown className="custom-dropdown" title="" id="username">
 //                                <LinkContainer to="/profile">
 //                                    <NavDropdown.Item>
 //                                        Profile
 //                                    </NavDropdown.Item>
 //                                </LinkContainer>
 //                                    <NavDropdown.Item onClick={logOutHandler}>
 //                                        Logout
 //                                    </NavDropdown.Item>
 //                            </NavDropdown>
 // 
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
           <Container>
                <LinkContainer to="/">
                    <Navbar.Brand style={{"textDecoration":"none"}}>
                       <h4 className="header">
                            sandbox
                       </h4> 
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <div className="custom-dropdown">
                            <Nav.Link>
                            {screenType !== "mobile" && userInfo?.profilepicture && (
                                <Whisper 
                                    placement="bottom"
                                    trigger="hover"
                                    controlId="control-id-hover-enterable"
                                    speaker={speaker}
                                    enterable
                                >
                                    <Badge content="">
                                        <Avatar size="md" circle src={userInfo?.profilepicture} alt={userInfo.name} />
                                    </Badge>
                                </Whisper>
                            )}
                            </Nav.Link>
                            {/* incase you want that stuff back to drop down with your name*/}
                            {screenType === "mobile" ? (
                                <div className ="mobileOptions">
                                     <LinkContainer to="/products">
                                        <Nav.Link className="link">
                                            <AiOutlineShoppingCart />
                                            Products
                                        </Nav.Link>
                                    </LinkContainer>

                                     <LinkContainer to="/profile">
                                        <Nav.Link className="link">
                                            <FaSignInAlt />
                                            Profile
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/about">
                                        <Nav.Link className="link">
                                            <FaSignInAlt />
                                            About 
                                        </Nav.Link>
                                    </LinkContainer>
                                    <div onClick={logOutHandler}>
                                        <Nav.Link className="link">
                                            <FaSignOutAlt />
                                            Logout
                                        </Nav.Link>
                                    </div>
                                </div>
                            ):(null)
                            }
                           </div>
                        ) : (
                            <>
                                    <LinkContainer to="/login">
                                        <Nav.Link >
                                            <FaSignInAlt />
                                            Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            <FaSignOutAlt />
                                            Sign Up
                                        </Nav.Link>
                                    </LinkContainer>
                            </>
                        ) }
                   </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}


